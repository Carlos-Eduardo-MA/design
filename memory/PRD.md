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
- Galeria masonry estilo Pinterest: busca, filtros por categoria, hover overlay, salvar (localStorage)
- Página dedicada de projeto `/projeto/:id`: detalhes completos (categoria, cliente, ano, entrega, imagem em destaque, descrição), CTA WhatsApp, navegação anterior/próximo
- Seção Sobre: foto, bio, manifesto, abas Certificados/Especializações/Prêmios (conteúdo MOCK)
- Formulário Fale Comigo → salva no MongoDB, toast de sucesso
- Botão flutuante WhatsApp (número EXEMPLO +55 11 99999-9999, mensagem pré-formatada)
- Painel /admin com login JWT: cadastrar projeto (título, categoria, imagem URL, descrição, ano, cliente, formato), excluir projetos, ver mensagens
- Logo SVG autoral + favicon, paleta off-white/grafite/vermello, Playfair Display + Plus Jakarta Sans + JetBrains Mono
- Seed: 6 projetos de exemplo (só quando coleção vazia)
- Marca real: "bia assis®" — Ana Beatriz Assis, brand designer, Resende - RJ (WhatsApp +55 24 99999-8186, abiadesigner@gmail.com)
- Conteúdo real importado do Behance (perfil abiassis_): bio, formação (Design + especialização em Branding pela Ana Couto), ferramentas (Illustrator, Photoshop, Creative Cloud), redes (IG @abiassis_, LinkedIn ana-beatriz-assis)
- Projeto real "Rebranding — Colégio ICT" substituiu os 6 mocks (imagens salvas localmente em /public/images)
- Fotos reais da Ana enviadas pela usuária em /public/images (ana-retrato.jpg no Sobre)

## Credenciais
- Admin: admin@duarte.studio / duarte123 (ver /app/memory/test_credentials.md)

## Identidade visual (ajustes 17/10/2026)
- Paleta base preto/cinza/branco + acentos vibrantes autorizados pela usuária: vermelho-laranja #FF4A1F, lavanda #C9B8FF, amarelo #FFC61A, azul #7FB5FF
- Hero estilo colagem criativa (referências enviadas): foto 2 da Bia (camisa branca) em arco P&B com borda branca, flor vermelha girando, blob lavanda, pílulas flutuantes (branding/identidade visual/naming/direção de arte), sparkles, highlight amarelo em "com alma,"
- Fix: descendentes do hero não são mais cortadas (padding nas máscaras de linha)
- Marquee com texto alternando sólido/vazado e pontinhos coloridos
- Highlights coloridos nos títulos das seções (lavanda no portfólio, amarelo no sobre, azul no contato)
- Rodapé: linha única "© 2026 Bia Assis® · Brand Designer · Resende, RJ"

## Pendências conhecidas / backlog
- P0: ~~Trocar número de WhatsApp~~ FEITO (número real +55 24 99999-8186)
- P0: ~~Substituir conteúdo mock~~ FEITO (dados reais da Ana Beatriz importados do Behance + fotos enviadas)
- P0: ~~LinkedIn~~ FEITO (experiências reais adicionadas: VCRP, Mediccont, Myne Agency, Nós; bio atualizada com direção de arte digital/impressa e 9+ anos)
- P1: Adicionar mais projetos reais pelo /admin (o Behance público só tem 1 projeto)
- P1: Upload de imagem no admin (hoje é URL) — via object storage
- P1: Editar projeto existente no admin (backend PUT já existe; falta UI)
- P1: Edição do Sobre/formação pelo admin (hoje é estático no código)
- P2: Notificação por e-mail quando chegar mensagem (Resend)
- P2: Galeria de múltiplas imagens na página do projeto
- P2: SEO avançado (OG image, sitemap)

## Próximas tarefas
1. Receber dados reais da designer e substituir mocks
2. Upload de imagens no painel admin
3. UI de edição de projetos
