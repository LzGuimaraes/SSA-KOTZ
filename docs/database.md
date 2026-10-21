# Banco de dados

O ambiente local usa PostgreSQL 17 em Docker Compose, com volume nomeado e healthcheck.
O banco fica acessível apenas em `127.0.0.1:5433`. Dentro do container, a porta é `5432`.

## Configuração

| Arquivo                        | Responsabilidade                                                           |
| ------------------------------ | -------------------------------------------------------------------------- |
| `.env`                         | Nome, usuário, senha e porta externa do PostgreSQL                         |
| `backend/.env`                 | `DATABASE_URL` usada pelo backend e pela CLI Prisma                        |
| `backend/prisma.config.ts`     | Datasource da CLI, caminho do schema e futuras migrations                  |
| `backend/prisma/schema.prisma` | Provider PostgreSQL e geração do cliente                                   |
| `backend/src/prisma/`          | Cliente compartilhado, conexão e encerramento pelo ciclo de vida do NestJS |

Execute `npm run env:setup` na raiz para criar os arquivos locais com uma senha aleatória e URLs correspondentes. O comando preserva arquivos existentes; alterações posteriores nas credenciais ou portas devem ser sincronizadas manualmente.

Prisma 7 usa o adapter PostgreSQL `@prisma/adapter-pg`. O cliente é gerado em
`backend/src/generated/prisma/`, ignorado pelo Git. A URL da CLI fica em `prisma.config.ts`;
o serviço NestJS recebe a mesma `DATABASE_URL` por `ConfigService`.

## Estado nesta etapa

Não há modelos, relações, seeds, migrations ou tabelas da aplicação. Não execute `db pull`
ou crie um modelo fictício apenas para iniciar o projeto. `prisma generate` e `prisma validate`
operam sobre o schema inicial sem alterar o banco.

O backend executa `SELECT 1` ao iniciar. A rota `GET /api/health` repete essa consulta e
retorna `200` com `{ "status": "ok", "database": "up" }`, ou `503` se a conexão estiver
indisponível. Nenhum dado de negócio é lido ou gravado.

## Comandos

Na raiz do repositório:

```bash
npm run db:up
npm run prisma:generate
npm run prisma:validate
docker compose exec postgres sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
npm run db:logs
npm run db:down
```

`db:down` preserva o volume. Alterar `POSTGRES_USER`, `POSTGRES_PASSWORD` ou `POSTGRES_DB`
no `.env` não reconfigura um volume já inicializado: mantenha as credenciais originais
ou altere o banco explicitamente. A modelagem e a primeira migration ficam para a próxima etapa.
