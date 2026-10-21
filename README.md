# SSA KOTZ

Base full-stack para uma plataforma de guias e builds de **Saint Seiya Awakening:
Knights of the Zodiac**.

Esta primeira etapa entrega a infraestrutura e a arquitetura modular, uma página inicial
e uma rota técnica de saúde. CRUD, autenticação, modelos relacionais e painéis serão
implementados nas próximas etapas. A dependência JWT está instalada, mas não há emissão
de tokens, guards ou rotas de autenticação.

## Stack

- **Backend:** NestJS 11, TypeScript 5.9, Prisma 7, PostgreSQL, Swagger, class-validator e class-transformer.
- **Frontend:** Vue 3, Vite 8, Tailwind CSS 4, Pinia 3, Vue Router 4, Axios e Lucide.
- **Infraestrutura:** PostgreSQL 17 via Docker Compose, npm workspaces, ESLint e Prettier.

As versões instaladas estão fixadas no `package-lock.json` compartilhado. Use npm na
raiz para instalar ambos os workspaces. O backend usa CommonJS, com geração do Prisma
configurada para esse formato. Tailwind 4 é integrado diretamente ao Vite por plugin.

## Requisitos

- Node.js 22.13+ na linha 22 ou Node.js 24+; npm 10+.
- Docker com o daemon em execução e Docker Compose com suporte a `up --wait`.
- Portas locais `3000`, `5173` e `5433` disponíveis.

Com nvm, `nvm install` e `nvm use` selecionam a linha indicada em `.nvmrc`.

## Execução local

```bash
git clone https://github.com/LzGuimaraes/SSA-KOTZ.git ssa-kotz
cd ssa-kotz

# Cria .env, backend/.env e frontend/.env, sem sobrescrever arquivos existentes.
# Gera uma senha aleatória para o banco e um JWT_SECRET reservado para uso futuro.
npm run env:setup

# Instala os dois workspaces usando o lockfile.
npm ci

# Aguarda o healthcheck do PostgreSQL.
npm run db:up

# Gera o cliente e verifica o schema, sem criar tabelas.
npm run prisma:generate
npm run prisma:validate

# Inicia API e frontend com recarga automática.
npm run dev
```

| Serviço      | Endereço                            |
| ------------ | ----------------------------------- |
| Frontend     | http://localhost:5173               |
| API / saúde  | http://localhost:3000/api/health    |
| Swagger UI   | http://localhost:3000/api/docs      |
| OpenAPI JSON | http://localhost:3000/api/docs-json |
| PostgreSQL   | `localhost:5433`                    |

O Docker executa somente o banco; backend e frontend rodam no host. A API exige uma
conexão válida com o banco ao iniciar. A página inicial mostra o estado dessa conexão
e permite verificá-la novamente. Os cartões de conteúdo indicam funcionalidades futuras.

Para usar terminais separados:

```bash
npm run dev:backend
# Em outro terminal:
npm run dev:frontend
```

`Ctrl+C` encerra os processos de desenvolvimento. Para parar o banco, execute
`npm run db:down`; os dados do volume são preservados.

## Variáveis de ambiente

Cada camada possui `.env.example`. Os arquivos `.env` locais são ignorados pelo Git.
Você também pode copiar os três exemplos manualmente, mantendo as credenciais do banco
iguais no `.env` da raiz e na `DATABASE_URL` do backend.

| Arquivo         | Variáveis                                                                           |
| --------------- | ----------------------------------------------------------------------------------- |
| `.env`          | `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT`                |
| `backend/.env`  | `NODE_ENV`, `HOST`, `PORT`, `DATABASE_URL`, `CORS_ORIGIN`, `JWT_SECRET` (reservado) |
| `frontend/.env` | `VITE_API_URL`, `VITE_PORT`                                                         |

`CORS_ORIGIN` aceita origens HTTP(S) separadas por vírgula, sem barra final. Exemplo:
`http://localhost:5173,http://127.0.0.1:5173`. Somente `localhost:5173` está liberado por
padrão. Não coloque segredos nas variáveis `VITE_*`: elas são públicas no navegador.

A porta externa do PostgreSQL é `5433` para coexistir com instalações locais em `5432`.
Se mudar `POSTGRES_PORT`, atualize também `DATABASE_URL`. Se mudar `PORT` da API,
atualize `VITE_API_URL`; se mudar `VITE_PORT`, atualize `CORS_ORIGIN`. Reinicie os
serviços após alterar os ambientes.

## Verificação

```bash
npm run lint
npm run format:check
npm run prisma:validate
npm run build

# Com npm run dev e o PostgreSQL ativos, em outro terminal:
npm run smoke
```

O smoke verifica a conexão real via Prisma, resposta da API, Swagger/OpenAPI, CORS
(origem permitida e não permitida) e HTML servido pelo frontend. Não substitui a
verificação visual no navegador. Para portas personalizadas:

```bash
SMOKE_API_URL=http://localhost:3001/api SMOKE_WEB_URL=http://localhost:5174 npm run smoke
```

`npm run format` aplica a formatação. `npm run lint:fix` aplica as correções automáticas do ESLint.

## Build local

```bash
npm run build
npm run start:prod --workspace backend
# Em outro terminal, apenas para conferir o bundle local:
npm run preview --workspace frontend
```

O backend compilado fica em `backend/dist/`; o frontend em `frontend/dist/`. O preview
usa `http://localhost:4173`; para consultar a API nele, inclua essa origem em
`CORS_ORIGIN` e reinicie o backend. Em uma futura hospedagem do frontend, configure o
servidor para redirecionar rotas da SPA para `index.html`. Esta etapa não inclui deploy.

## Organização

```text
ssa-kotz/
├── backend/
│   ├── prisma/schema.prisma
│   ├── prisma.config.ts
│   └── src/
│       ├── common/health/
│       ├── config/
│       ├── modules/
│       │   ├── auth/
│       │   ├── users/
│       │   ├── knights/
│       │   ├── cosmos/
│       │   ├── builds/
│       │   ├── creators/
│       │   ├── guides/
│       │   ├── admin/
│       │   └── media/
│       ├── prisma/
│       ├── app.module.ts
│       └── main.ts
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── composables/
│       ├── layouts/
│       ├── router/
│       ├── services/
│       ├── stores/
│       ├── types/
│       ├── views/{public,admin,creator}/
│       └── App.vue
├── docs/database.md
├── scripts/
├── docker-compose.yml
└── package.json
```

Os módulos de domínio estão registrados e vazios. As pastas `admin` e `creator` do
frontend estão reservadas, sem painéis ou rotas. Novos endpoints devem ficar nos módulos
correspondentes; o cliente Axios centralizado fica em `frontend/src/services/api.ts`.

Veja [docs/database.md](docs/database.md) para detalhes da conexão, volume e Prisma.

Referências usadas na configuração: [Prisma no NestJS](https://docs.nestjs.com/recipes/prisma),
[configuração do Prisma 7](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7)
e [Tailwind com Vite](https://tailwindcss.com/docs/installation/using-vite).
Lucide usa o pacote atual [`@lucide/vue`](https://lucide.dev/guide/version-1).
