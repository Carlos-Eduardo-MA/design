from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import logging
import os
from datetime import datetime, timedelta, timezone
from typing import List, Optional
from urllib.parse import urlsplit
from uuid import uuid4

import aiomysql
import bcrypt
import jwt
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

JWT_ALGORITHM = "HS256"
DEFAULT_CORS_ORIGINS = (
    "https://carlos-eduardo-ma.github.io",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
)


def get_cors_origins() -> list[str]:
    configured = os.environ.get("CORS_ORIGINS")
    origins = [origin.strip() for origin in configured.split(",")] if configured else list(DEFAULT_CORS_ORIGINS)
    if not origins or any(not origin or origin == "*" for origin in origins):
        raise RuntimeError("CORS_ORIGINS deve conter origens explícitas; curingas não são permitidos.")

    for origin in origins:
        parsed = urlsplit(origin)
        local_http = parsed.scheme == "http" and parsed.hostname in {"localhost", "127.0.0.1"}
        if (
            parsed.scheme not in {"http", "https"}
            or not parsed.netloc
            or (parsed.scheme != "https" and not local_http)
            or parsed.path
            or parsed.query
            or parsed.fragment
        ):
            raise RuntimeError(f"Origem CORS inválida: {origin}")
    return origins


def required_setting(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise RuntimeError(f"A variável de ambiente {name} é obrigatória.")
    return value


def validate_security_settings() -> None:
    jwt_secret = required_setting("JWT_SECRET")
    if len(jwt_secret) < 32:
        raise RuntimeError("JWT_SECRET deve conter pelo menos 32 caracteres aleatórios.")

    required_setting("ADMIN_EMAIL")
    admin_password = required_setting("ADMIN_PASSWORD")
    if len(admin_password) < 16:
        raise RuntimeError("ADMIN_PASSWORD deve conter pelo menos 16 caracteres.")

    required_setting("MYSQL_USER")
    required_setting("MYSQL_PASSWORD")
    required_setting("DB_NAME")


app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

pool: Optional[aiomysql.Pool] = None


class Project(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    category: str
    image_url: str
    behance_url: str = "https://behance.net"
    description: str = ""
    year: str = ""
    client: str = ""
    ratio: str = "tall"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ProjectCreate(BaseModel):
    title: str
    category: str
    image_url: str
    behance_url: str = "https://behance.net"
    description: str = ""
    year: str = ""
    client: str = ""
    ratio: str = "tall"


class ContactMessage(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    message: str = Field(min_length=5, max_length=3000)


class LoginInput(BaseModel):
    email: str
    password: str


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=30),
        "type": "access",
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


def _with_utc_datetime(row: dict) -> dict:
    result = dict(row)
    created_at = result.get("created_at")
    if created_at and created_at.tzinfo is None:
        result["created_at"] = created_at.replace(tzinfo=timezone.utc)
    return result


async def fetch_one(query: str, params: tuple = ()) -> Optional[dict]:
    if pool is None:
        raise RuntimeError("A conexão com o MySQL ainda não foi inicializada.")
    async with pool.acquire() as connection:
        async with connection.cursor(aiomysql.DictCursor) as cursor:
            await cursor.execute(query, params)
            return await cursor.fetchone()


async def fetch_all(query: str, params: tuple = ()) -> list:
    if pool is None:
        raise RuntimeError("A conexão com o MySQL ainda não foi inicializada.")
    async with pool.acquire() as connection:
        async with connection.cursor(aiomysql.DictCursor) as cursor:
            await cursor.execute(query, params)
            return await cursor.fetchall()


async def execute(query: str, params: tuple = ()) -> int:
    if pool is None:
        raise RuntimeError("A conexão com o MySQL ainda não foi inicializada.")
    async with pool.acquire() as connection:
        async with connection.cursor() as cursor:
            await cursor.execute(query, params)
            return cursor.rowcount


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    if not credentials:
        raise HTTPException(status_code=401, detail="Não autenticado")
    try:
        payload = jwt.decode(credentials.credentials, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Token inválido")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")
    user = await fetch_one(
        "SELECT id, email, name, role FROM users WHERE id = %s",
        (payload.get("sub"),),
    )
    if not user:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Acesso restrito ao administrador")
    return user


@api_router.get("/")
async def root():
    return {"message": "Bia Assis® API"}


@api_router.post("/auth/login")
async def login(data: LoginInput, request: Request):
    email = data.email.lower().strip()
    client_host = request.client.host if request.client else "unknown"
    identifier = f"{client_host}:{email}"
    attempts = await fetch_one(
        "SELECT attempt_count, locked_until FROM login_attempts WHERE identifier = %s",
        (identifier,),
    )
    if attempts and attempts["attempt_count"] >= 5 and attempts["locked_until"]:
        locked_until = attempts["locked_until"]
        if locked_until.tzinfo is None:
            locked_until = locked_until.replace(tzinfo=timezone.utc)
        if locked_until > datetime.now(timezone.utc):
            raise HTTPException(status_code=429, detail="Muitas tentativas. Tente novamente em 15 minutos.")

    user = await fetch_one(
        "SELECT id, email, name, role, password_hash FROM users WHERE email = %s",
        (email,),
    )
    if not user or not verify_password(data.password, user["password_hash"]):
        await execute(
            """
            INSERT INTO login_attempts (identifier, attempt_count, locked_until)
            VALUES (%s, 1, %s)
            ON DUPLICATE KEY UPDATE
                attempt_count = attempt_count + 1,
                locked_until = VALUES(locked_until)
            """,
            (identifier, datetime.now(timezone.utc).replace(tzinfo=None) + timedelta(minutes=15)),
        )
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")

    await execute("DELETE FROM login_attempts WHERE identifier = %s", (identifier,))
    token = create_access_token(user["id"], email)
    return {
        "token": token,
        "user": {"email": email, "name": user["name"], "role": user["role"]},
    }


@api_router.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user


@api_router.get("/projects", response_model=List[Project])
async def list_projects():
    docs = await fetch_all("SELECT * FROM projects ORDER BY created_at DESC LIMIT 500")
    return [Project.model_validate(_with_utc_datetime(doc)) for doc in docs]


@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    doc = await fetch_one("SELECT * FROM projects WHERE id = %s", (project_id,))
    if not doc:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return Project.model_validate(_with_utc_datetime(doc))


@api_router.post("/projects", response_model=Project, status_code=201)
async def create_project(data: ProjectCreate, user: dict = Depends(get_current_user)):
    project_id = str(uuid4())
    values = data.model_dump()
    await execute(
        """
        INSERT INTO projects (id, title, category, image_url, behance_url, description, year, client, ratio)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            project_id,
            values["title"],
            values["category"],
            values["image_url"],
            values["behance_url"],
            values["description"],
            values["year"],
            values["client"],
            values["ratio"],
        ),
    )
    doc = await fetch_one("SELECT * FROM projects WHERE id = %s", (project_id,))
    return Project.model_validate(_with_utc_datetime(doc))


@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, data: ProjectCreate, user: dict = Depends(get_current_user)):
    existing = await fetch_one("SELECT id FROM projects WHERE id = %s", (project_id,))
    if not existing:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    values = data.model_dump()
    await execute(
        """
        UPDATE projects
        SET title = %s, category = %s, image_url = %s, behance_url = %s,
            description = %s, year = %s, client = %s, ratio = %s
        WHERE id = %s
        """,
        (
            values["title"],
            values["category"],
            values["image_url"],
            values["behance_url"],
            values["description"],
            values["year"],
            values["client"],
            values["ratio"],
            project_id,
        ),
    )
    doc = await fetch_one("SELECT * FROM projects WHERE id = %s", (project_id,))
    return Project.model_validate(_with_utc_datetime(doc))


@api_router.delete("/projects/{project_id}", status_code=204)
async def delete_project(project_id: str, user: dict = Depends(get_current_user)):
    deleted = await execute("DELETE FROM projects WHERE id = %s", (project_id,))
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")


@api_router.post("/contact", response_model=ContactMessage, status_code=201)
async def create_contact(data: ContactCreate):
    message_id = str(uuid4())
    await execute(
        "INSERT INTO contact_messages (id, name, email, message) VALUES (%s, %s, %s, %s)",
        (message_id, data.name, str(data.email), data.message),
    )
    doc = await fetch_one("SELECT * FROM contact_messages WHERE id = %s", (message_id,))
    return ContactMessage.model_validate(_with_utc_datetime(doc))


@api_router.get("/messages", response_model=List[ContactMessage])
async def list_messages(user: dict = Depends(get_current_user)):
    docs = await fetch_all("SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 500")
    return [ContactMessage.model_validate(_with_utc_datetime(doc)) for doc in docs]


SEED_PROJECTS = [
    {
        "title": "Rebranding — Colégio ICT",
        "category": "Rebranding & Identidade Visual",
        "image_url": "/images/ict-capa.png",
        "description": "Rebranding realizado para o Instituto de Cultura Técnica, escola tradicional de Volta Redonda, interior do RJ — cidade conhecida pelo setor industrial, sede da CSN. A escola alia ensino médio a cursos técnicos e é um dos maiores pontos de partida para o mercado de trabalho da Região Sul Fluminense. O desafio: firmar uma marca única e compreendida por todos, superar as expectativas das pessoas e sustentar um crescimento consistente.",
        "year": "2021",
        "client": "Instituto de Cultura Técnica · Volta Redonda, RJ",
        "ratio": "wide",
    },
]


async def seed_admin():
    admin_email = required_setting("ADMIN_EMAIL").lower()
    admin_password = required_setting("ADMIN_PASSWORD")
    existing = await fetch_one("SELECT id, password_hash FROM users WHERE email = %s", (admin_email,))
    if existing is None:
        await execute(
            "INSERT INTO users (id, email, password_hash, name, role) VALUES (%s, %s, %s, %s, %s)",
            (str(uuid4()), admin_email, hash_password(admin_password), "Ana Beatriz Assis", "admin"),
        )
        logger.info("Admin seedado: %s", admin_email)
    elif not verify_password(admin_password, existing["password_hash"]):
        await execute(
            "UPDATE users SET password_hash = %s WHERE email = %s",
            (hash_password(admin_password), admin_email),
        )
        logger.info("Senha do admin atualizada a partir do .env")
    await execute(
        "DELETE FROM users WHERE email = %s AND email <> %s",
        ("admin@example.com", admin_email),
    )


@app.on_event("startup")
async def startup():
    global pool
    validate_security_settings()
    pool = await aiomysql.create_pool(
        host=os.environ.get("MYSQL_HOST", "127.0.0.1"),
        port=int(os.environ.get("MYSQL_PORT", "3306")),
        user=required_setting("MYSQL_USER"),
        password=os.environ.get("MYSQL_PASSWORD", ""),
        db=os.environ["DB_NAME"],
        minsize=1,
        maxsize=10,
        autocommit=True,
        charset="utf8mb4",
        init_command="SET time_zone = '+00:00'",
    )

    schema = [
        """
        CREATE TABLE IF NOT EXISTS users (
            id CHAR(36) PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            name VARCHAR(120) NOT NULL,
            role VARCHAR(50) NOT NULL DEFAULT 'admin',
            created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        """,
        """
        CREATE TABLE IF NOT EXISTS projects (
            id CHAR(36) PRIMARY KEY,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            image_url TEXT NOT NULL,
            behance_url VARCHAR(500) NOT NULL DEFAULT 'https://behance.net',
            description TEXT NOT NULL,
            year VARCHAR(20) NOT NULL DEFAULT '',
            client TEXT NOT NULL,
            ratio VARCHAR(20) NOT NULL DEFAULT 'tall',
            created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            INDEX idx_projects_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        """,
        """
        CREATE TABLE IF NOT EXISTS contact_messages (
            id CHAR(36) PRIMARY KEY,
            name VARCHAR(120) NOT NULL,
            email VARCHAR(320) NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            INDEX idx_contact_messages_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        """,
        """
        CREATE TABLE IF NOT EXISTS login_attempts (
            identifier VARCHAR(320) PRIMARY KEY,
            attempt_count INT NOT NULL DEFAULT 0,
            locked_until DATETIME(6) NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        """,
    ]
    for statement in schema:
        await execute(statement)

    await seed_admin()
    project_count = await fetch_one("SELECT COUNT(*) AS total FROM projects")
    if project_count["total"] == 0:
        for project in SEED_PROJECTS:
            values = ProjectCreate(**project).model_dump()
            await execute(
                """
                INSERT INTO projects
                    (id, title, category, image_url, behance_url, description, year, client, ratio)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    str(uuid4()),
                    values["title"],
                    values["category"],
                    values["image_url"],
                    values["behance_url"],
                    values["description"],
                    values["year"],
                    values["client"],
                    values["ratio"],
                ),
            )
        logger.info("Projetos iniciais seedados")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=get_cors_origins(),
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    global pool
    if pool is not None:
        pool.close()
        await pool.wait_closed()
        pool = None
