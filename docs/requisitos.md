# SSA-KOTZ — Requisitos iniciais

> Status: **planejado**. Prioridades: `MVP`, `POSTERIOR`. Este documento define o produto; a execução é sempre limitada à tarefa atual.

## Visão do produto

Plataforma web de consulta de cavaleiros, upskills, cosmos e builds de **Saint Seiya Awakening: Knights of the Zodiac**, com catálogo oficial administrado pelo site e conteúdo complementar de criadores/Youtubers.

## Perfis e permissões

- **Visitante:** consulta conteúdos publicados.
- **Usuário autenticado:** consulta e favorita cavaleiros.
- **Criador aprovado:** cria, edita e submete suas próprias builds e guias; não pode alterar conteúdo de terceiros nem publicar sem aprovação.
- **Administrador:** gerencia catálogo, builds oficiais, usuários e moderação; registra decisões administrativas.

Permissões devem ser verificadas no **NestJS**, incluindo a propriedade do recurso. Ocultar botão no Vue não substitui autorização na API.

## Requisitos funcionais

| ID | Requisito | Prioridade |
|---|---|---|
| RF01 | Listar, pesquisar e filtrar cavaleiros por nome e raridade | MVP |
| RF02 | Exibir ficha de cavaleiro com nome, variante, imagem e raridade | MVP |
| RF03 | Exibir build oficial com níveis mínimos/ideais/maximizados | MVP |
| RF04 | Exibir cosmos por categoria e subatributos recomendados, com imagens quando disponíveis | MVP |
| RF05 | CRUD administrativo de raridades, cavaleiros, cosmos, categorias e atributos | MVP |
| RF06 | CRUD e publicação de builds oficiais | MVP |
| RF07 | Login e controle de acesso de administrador | MVP |
| RF08 | URLs amigáveis e páginas responsivas | MVP |
| RF09 | Solicitação e aprovação de perfis de criadores | POSTERIOR |
| RF10 | Criadores cadastram builds próprias e submetem para revisão | POSTERIOR |
| RF11 | Administrador aprova/rejeita versões com justificativa | POSTERIOR |
| RF12 | Versões públicas anteriores permanecem estáveis durante edição/revisão | POSTERIOR |
| RF13 | Criadores publicam guias e associam vídeos do YouTube a cavaleiros | POSTERIOR |
| RF14 | Usuários autenticados favoritam cavaleiros | POSTERIOR |
| RF15 | Auditoria de alterações administrativas | POSTERIOR |
| RF16 | Importar planilha inicial sem duplicações e registrar inconsistências | POSTERIOR |
| RF17 | Painel administrativo com contagens de conteúdo e pendências | POSTERIOR |

## Regras de negócio

1. Cada cavaleiro pode possuir **no máximo uma build oficial** e diversas builds comunitárias.
2. Builds comunitárias exigem criador aprovado e moderação antes de ficarem públicas.
3. Alterações em build publicada geram nova versão; a versão anterior continua publicada até a nova aprovação.
4. Cosmos, atributos e cavaleiros são catálogos compartilhados, não duplicados em cada build.
5. As sequências de upskills são strings (`1433`), não valores inteiros.
6. Imagens serão referenciadas por URL e metadados, sem salvar binário no PostgreSQL.
7. Links/vídeos externos devem ser validados; preservar autoria e créditos.
8. Administradores podem moderar conteúdos, e decisões devem ser rastreáveis.

## Requisitos não funcionais

- **Stack:** NestJS, TypeScript, Prisma, PostgreSQL, Vue 3, Vite, Tailwind CSS, Pinia, Vue Router e Axios.
- **Segurança:** hash forte para senhas; JWT; RBAC; validação de DTOs; autorização por recurso; variáveis de ambiente; nenhuma credencial em Git.
- **API:** REST, Swagger, status HTTP consistentes, paginação e tratamento de erros.
- **Banco:** migrations versionadas, FKs, índices e unicidade; sem comandos destrutivos não autorizados.
- **Frontend:** responsivo, acessível, estados de loading/erro/vazio e carregamento otimizado de imagens.
- **Qualidade:** TypeScript estrito, código modular, testes básicos e README de execução.
- **Infra local:** Docker Compose para PostgreSQL e `.env.example` sem segredos.

## Etapas de desenvolvimento

### Etapa 0 — Bootstrap (tarefa inicial)

Inicializar `backend/` e `frontend/`, configurar Docker Compose/PostgreSQL, Prisma, Swagger, Tailwind, Pinia, Router, Axios e uma página de boas-vindas. Verificar inicialização, documentar comandos e **não** implementar entidades, CRUDs, auth ou painel.

### Etapa 1 — Catálogo

Modelagem e migrations de raridades, cavaleiros, categorias de cosmos, cosmos, atributos e mídias. CRUDs NestJS e páginas públicas de listagem/detalhe.

### Etapa 2 — Builds oficiais

Modelagem de Build, BuildVersion, BuildSkill, BuildCosmos e BuildAttribute; API de consulta e renderização de builds. Regras para uma oficial por cavaleiro.

### Etapa 3 — Admin e autenticação

Usuários, RBAC, JWT, proteção dos endpoints de escrita e painel administrativo funcional.

### Etapa 4 — Comunidade

Perfis de criadores, guias, submissões, moderação, versionamento de alterações e auditoria.

### Etapa 5 — Importação e lançamento

Importador idempotente da planilha, revisão da qualidade dos dados, performance, SEO e revisão de direitos das imagens e fontes.

## Orientações para agente de IA

- Consulte `docs/database.md` antes de alterar banco/Prisma e este arquivo antes de implementar requisitos.
- Não implemente etapas futuras sem solicitação explícita.
- Se uma decisão importante não estiver especificada, indique a alternativa mais simples e registre-a; não invente regras de negócio.
- Não altere documentos de arquitetura ou requisitos silenciosamente: explique o motivo.
- Não execute commits nem mudanças destrutivas sem pedido.
- Ao concluir uma tarefa, informe arquivos alterados, testes executados e limitações.
