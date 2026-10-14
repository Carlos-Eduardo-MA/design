# Auth Testing Playbook (Duarte® Portfolio)

## Credenciais
- Admin: admin@duarte.studio / duarte123 (seed via startup, reconcile de senha com .env a cada restart)

## Passo 1: MongoDB
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
```
Verificar: hash bcrypt começa com `$2b$`, índice único em users.email, índice em login_attempts.identifier.

## Passo 2: API
```
API_URL=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)
TOKEN=$(curl -s -X POST "$API_URL/api/auth/login" -H "Content-Type: application/json" -d '{"email":"admin@duarte.studio","password":"duarte123"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")
curl -s "$API_URL/api/auth/me" -H "Authorization: Bearer $TOKEN"
curl -s "$API_URL/api/projects"
curl -s -X POST "$API_URL/api/contact" -H "Content-Type: application/json" -d '{"name":"Teste","email":"t@t.com","message":"Olá, teste!"}'
```

Login retorna `{token, user}`. `/me` retorna o usuário com Bearer token.
