# PRD — Duarte® Studio de Marcas (Portfólio de Designer)

## Problem statement original
"quero construir um site que é para uma design que é especialista em marcas, mas precisa ter uma galeria para exibir o seu portifólio do behance, tem que ter um botão para whatsapp e um campo para receber emails, colocar um sobre, foto e lugar para exibir certificados e especialização"

Decisões da usuária:
- Galeria no site com projetos cadastrados manualmente via painel admin simples
- WhatsApp com número de exemplo (trocar depois)
- Formulário "Fale comigo" (nome, e-mail, mensagem)
- Conteúdo mock (nome, foto, bio, certificados) — usuária enviará dados reais depois
- Tema claro/minimalista, cinzas e branco; galeria estilo Pinterest; tom descontraído

## Personas
- **Marina (dona do site)**: entra no /admin, cadastra/edita/remove projetos da galeria, lê mensagens recebidas
- **Visitante/cliente potencial**: vê o portfólio, filtra por categoria, abre detalhes, vai ao Behance, chama no WhatsApp ou envia mensagem

## Arquitetura
- FastAPI + MongoDB (`test_database`): coleções `users`, `projects`, `contact_messages`, `login_attempts`
- Auth JWT (Bearer, 12h), bcrypt, lockout de 5 tentativas/15min
- React 19 + Tailwind + shadcn + framer-motion + lenis (scroll suave)
- Rotas: `/` (site) e `/admin` (painel)
- Marca fictícia: "duarte®" — Marina Duarte, especialista em marcas, São Paulo

## Implementado (14/10/2026)
- Hero editorial com reveal cinético linha a linha, parallax do asterisco, stats
- Marquee editorial lento (CSS animation)
- Galeria masonry estilo Pinterest: busca, filtros por categoria, hover overlay, salvar (localStorage), modal de projeto com link Behance
- Seção Sobre: foto, bio, manifesto, abas Certificados/Especializações/Prêmios (conteúdo MOCK)
- Formulário Fale Comigo → salva no MongoDB, toast de sucesso
- Botão flutuante WhatsApp (número EXEMPLO +55 11 99999-9999, mensagem pré-formatada)
- Painel /admin com login JWT: cadastrar projeto (título, categoria, imagem URL, Behance, descrição, ano, cliente, formato), excluir projetos, ver mensagens
- Logo SVG autoral + favicon, paleta off-white/grafite/vermello, Playfair Display + Plus Jakarta Sans + JetBrains Mono
- Seed: 6 projetos de exemplo (só quando coleção vazia)

## Credenciais
- Admin: admin@duarte.studio / duarte123 (ver /app/memory/test_credentials.md)

## Pendências conhecidas / backlog
- P0: Trocar número de WhatsApp pelo real (src/config.js)
- P0: Substituir conteúdo mock: foto da designer, bio, certificados, e-mail, links sociais (Behance/Instagram/LinkedIn), projetos reais com links reais do Behance
- P1: Upload de imagem no admin (hoje é URL) — via object storage
- P1: Editar projeto existente no admin (backend PUT já existe; falta UI)
- P1: Edição do Sobre/certificados pelo admin (hoje é estático no código)
- P2: Notificação por e-mail quando chegar mensagem (Resend)
- P2: Página individual de projeto (/projeto/:id)
- P2: SEO avançado (OG image, sitemap)

## Próximas tarefas
1. Receber dados reais da designer e substituir mocks
2. Upload de imagens no painel admin
3. UI de edição de projetos
