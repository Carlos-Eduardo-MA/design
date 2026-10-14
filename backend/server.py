from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import logging
import os
from datetime import datetime, timedelta, timezone
from typing import Annotated, List, Optional

import bcrypt
import jwt
from bson import ObjectId
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

JWT_ALGORITHM = "HS256"

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: Optional[PyObjectId] = Field(default=None, validation_alias="_id", serialization_alias="id")

    def to_mongo(self) -> dict:
        return self.model_dump(by_alias=True, exclude={"id"})

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls(**doc)


class Project(BaseDocument):
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


class ContactMessage(BaseDocument):
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
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
        "type": "access",
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


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
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")
    return {"id": str(user["_id"]), "email": user["email"], "name": user.get("name", "Admin"), "role": user.get("role", "admin")}


@api_router.get("/")
async def root():
    return {"message": "Duarte Studio API"}


@api_router.post("/auth/login")
async def login(data: LoginInput, request: Request):
    email = data.email.lower().strip()
    identifier = f"{request.client.host}:{email}"
    attempts = await db.login_attempts.find_one({"identifier": identifier})
    if attempts and attempts.get("count", 0) >= 5:
        locked_until = attempts.get("locked_until")
        if locked_until:
            if locked_until.tzinfo is None:
                locked_until = locked_until.replace(tzinfo=timezone.utc)
            if locked_until > datetime.now(timezone.utc):
                raise HTTPException(status_code=429, detail="Muitas tentativas. Tente novamente em 15 minutos.")
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(data.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1}, "$set": {"locked_until": datetime.now(timezone.utc) + timedelta(minutes=15)}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")
    await db.login_attempts.delete_one({"identifier": identifier})
    token = create_access_token(str(user["_id"]), email)
    return {"token": token, "user": {"email": email, "name": user.get("name", "Admin"), "role": user.get("role", "admin")}}


@api_router.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user


@api_router.get("/projects", response_model=List[Project])
async def list_projects():
    docs = await db.projects.find().sort("created_at", -1).to_list(500)
    return [Project.from_mongo(d) for d in docs]


@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    try:
        doc = await db.projects.find_one({"_id": ObjectId(project_id)})
    except Exception:
        doc = None
    if not doc:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return Project.from_mongo(doc)


@api_router.post("/projects", response_model=Project, status_code=201)
async def create_project(data: ProjectCreate, user: dict = Depends(get_current_user)):
    project = Project(**data.model_dump())
    result = await db.projects.insert_one(project.to_mongo())
    doc = await db.projects.find_one({"_id": result.inserted_id})
    return Project.from_mongo(doc)


@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, data: ProjectCreate, user: dict = Depends(get_current_user)):
    result = await db.projects.update_one({"_id": ObjectId(project_id)}, {"$set": data.model_dump()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    doc = await db.projects.find_one({"_id": ObjectId(project_id)})
    return Project.from_mongo(doc)


@api_router.delete("/projects/{project_id}", status_code=204)
async def delete_project(project_id: str, user: dict = Depends(get_current_user)):
    result = await db.projects.delete_one({"_id": ObjectId(project_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")


@api_router.post("/contact", response_model=ContactMessage, status_code=201)
async def create_contact(data: ContactCreate):
    message = ContactMessage(**data.model_dump())
    result = await db.contact_messages.insert_one(message.to_mongo())
    doc = await db.contact_messages.find_one({"_id": result.inserted_id})
    return ContactMessage.from_mongo(doc)


@api_router.get("/messages", response_model=List[ContactMessage])
async def list_messages(user: dict = Depends(get_current_user)):
    docs = await db.contact_messages.find().sort("created_at", -1).to_list(500)
    return [ContactMessage.from_mongo(d) for d in docs]


SEED_PROJECTS = [
    {
        "title": "Aura Botanicals",
        "category": "Branding & Packaging",
        "image_url": "https://images.unsplash.com/photo-1713873010288-c4617fc2b15b?crop=entropy&cs=srgb&fm=jpg&q=85",
        "behance_url": "https://behance.net",
        "description": "Identidade visual minimalista e embalagens sustentáveis para marca premium de cuidados naturais.",
        "year": "2025",
        "client": "Aura Botanicals",
        "ratio": "tall",
    },
    {
        "title": "Moisés Castro Arquitetura",
        "category": "Editorial & Naming",
        "image_url": "https://images.unsplash.com/photo-1636247498840-693054bb4bcc?crop=entropy&cs=srgb&fm=jpg&q=85",
        "behance_url": "https://behance.net",
        "description": "Sistema de identidade editorial e publicação institucional para estúdio de arquitetura contemporânea.",
        "year": "2024",
        "client": "MCA Studio",
        "ratio": "square",
    },
    {
        "title": "Castro Capital",
        "category": "Estratégia & Identidade",
        "image_url": "https://images.unsplash.com/photo-1636247499734-893da2bcfc1c?crop=entropy&cs=srgb&fm=jpg&q=85",
        "behance_url": "https://behance.net",
        "description": "Rebranding estratégico para gestora de investimentos com tipografia autoral e rigor suíço.",
        "year": "2025",
        "client": "Castro Capital",
        "ratio": "tall",
    },
    {
        "title": "Livro de Marca & Diretrizes",
        "category": "Brand Book",
        "image_url": "https://images.unsplash.com/photo-1636247499180-13285c86be9b?crop=entropy&cs=srgb&fm=jpg&q=85",
        "behance_url": "https://behance.net",
        "description": "Guia completo de aplicação de marca, tom de voz, paleta cromática e grade tipográfica.",
        "year": "2023",
        "client": "Confidencial",
        "ratio": "square",
    },
    {
        "title": "Monocromo Magazine",
        "category": "Design Editorial",
        "image_url": "https://images.unsplash.com/photo-1490013616775-3ca8865fb129?crop=entropy&cs=srgb&fm=jpg&q=85",
        "behance_url": "https://behance.net",
        "description": "Direção de arte e projeto gráfico para revista de design e cultura visual.",
        "year": "2024",
        "client": "Monocromo",
        "ratio": "wide",
    },
    {
        "title": "Ateliê & Tipografia Custom",
        "category": "Tipografia",
        "image_url": "https://images.unsplash.com/photo-1543441235-e8c913dea2d7?crop=entropy&cs=srgb&fm=jpg&q=85",
        "behance_url": "https://behance.net",
        "description": "Desenho de marca e lettering exclusivo para ateliê de arte contemporânea.",
        "year": "2025",
        "client": "Ateliê Norte",
        "ratio": "tall",
    },
]


async def seed_admin():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Marina Duarte",
            "role": "admin",
            "created_at": datetime.now(timezone.utc),
        })
        logger.info("Admin seedado: %s", admin_email)
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info("Senha do admin atualizada a partir do .env")


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    await seed_admin()
    if await db.projects.count_documents({}) == 0:
        for p in SEED_PROJECTS:
            await db.projects.insert_one(Project(**p).to_mongo())
        logger.info("Projetos iniciais seedados")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
