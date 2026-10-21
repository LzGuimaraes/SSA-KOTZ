---
name: nest-crud
description: Implemente ou modifique CRUDs, endpoints REST e módulos NestJS com TypeScript, Prisma e PostgreSQL. Use automaticamente em solicitações de criação, listagem, busca, atualização ou exclusão de recursos persistidos, e em mudanças de controllers, services, DTOs ou modules que compõem esses fluxos.
---

# Nest CRUD

Implemente somente as operações solicitadas. Um pedido de CRUD completo inclui criação, listagem paginada, busca por ID, atualização e exclusão; pedidos parciais não autorizam adicionar as demais operações.

## Entender o projeto antes de alterar

- Leia `AGENTS.md` e inspecione a estrutura real, os scripts e as dependências instaladas.
- Leia `backend/prisma/schema.prisma`, `backend/prisma.config.ts`, o serviço Prisma e as migrations existentes.
- Inspecione o módulo alvo e módulos semelhantes para identificar convenções de controllers, services, DTOs, rotas, paginação, Swagger, testes, filtros, pipes, interceptors, guards e decorators.
- Localize consumidores do contrato alterado e preserve trabalho não relacionado no Git.
- Reutilize componentes e padrões existentes. Não crie um framework genérico, repository base ou abstração compartilhada sem uma necessidade demonstrada por mais de um fluxo.
- Se o projeto ainda não tiver um padrão para uma decisão, escolha a solução NestJS mais simples e registre a decisão no resultado.

Quando o CRUD exigir mudança no schema, leia também `../prisma-migration/SKILL.md` se essa skill existir. Não amplie um pedido de endpoints para uma remodelagem de dados não solicitada.

## Manter as responsabilidades separadas

- **Controller:** define o contrato HTTP, recebe parâmetros e DTOs, aplica decorators e delega ao service. Não acesse Prisma nem concentre regras de negócio nele.
- **Service:** implementa regras do recurso, autorização dependente de dados, composição das consultas e tradução de falhas conhecidas.
- **DTOs:** definem e validam entradas de body, params e query. Use `class-validator` e `class-transformer` conforme a configuração existente.
- **Module:** registra somente controllers, providers, imports e exports necessários ao recurso.

Não exponha diretamente campos internos ou sensíveis só porque estão presentes no modelo Prisma. Preserve o formato de resposta já usado; crie um mapeamento explícito quando o modelo persistido e o contrato público forem diferentes.

## Implementar o contrato solicitado

Siga as convenções já existentes para rotas, status e formato das respostas. Quando ainda não houver convenção:

- criação valida o body, persiste uma vez e retorna o recurso criado com `201`;
- listagem usa um DTO de query, paginação limitada, ordenação determinística e metadados suficientes para navegar pelos resultados;
- busca por ID valida o identificador e retorna `404` quando o recurso não existe;
- atualização altera apenas campos permitidos, diferencia valor ausente de valor nulo e retorna `404` para recurso inexistente;
- exclusão respeita a política real do domínio. Não presuma hard delete, soft delete ou cascata; derive essa decisão do schema, das relações e do escopo.

Limite valores de `page` e `limit` para impedir consultas excessivas. Mantenha filtros e ordenação tipados e restritos a campos permitidos. Use uma transação quando contagem e leitura precisarem representar a mesma visão ou quando várias escritas forem dependentes.

## Preservar integridade e desempenho

- Verifique nulabilidade, defaults, unicidade, índices, chaves estrangeiras e ações referenciais antes de escrever queries.
- Valide relações recebidas e aplique regras de propriedade ou escopo antes da mutação.
- Trate concorrência: uma consulta prévia melhora a mensagem, mas não substitui a constraint do banco.
- Traduza erros Prisma conhecidos no limite adequado, como registro ausente para `404`, conflito de unicidade para `409` e violação relacional para a resposta compatível com o contrato. Não transforme falhas inesperadas em respostas falsas de validação nem exponha detalhes internos.
- Use `select`, `include`, agregações e consultas em lote de forma intencional. Evite uma consulta por item em loops e carregamento de relações que a resposta não utiliza.
- Use transações para operações atômicas dependentes; não envolva chamadas externas em transações longas.

## Aplicar autenticação e autorização

Reutilize guards, decorators, claims e papéis já existentes. Aplique autorização no backend e, quando ela depender do recurso, confirme propriedade, papel ou permissão no service antes de ler ou modificar dados.

Não invente um sistema paralelo de autenticação. Se a proteção exigida ainda não existir, implemente apenas quando fizer parte explícita do escopo; caso contrário, deixe a dependência clara como pendência. Nunca registre tokens, senhas ou dados sensíveis.

## Testar e verificar

Crie ou atualize testes que protejam comportamento relevante, seguindo a infraestrutura existente. Priorize:

- caminhos de sucesso de cada operação solicitada;
- validação e limites da paginação;
- recurso inexistente, conflitos de unicidade e integridade relacional;
- autorização, propriedade e papéis quando aplicáveis;
- seleção de dados e ausência de consultas N+1 quando esse risco existir.

Evite testes que apenas reproduzam a implementação. Use mocks do Prisma para testes unitários quando esse for o padrão do projeto e testes de integração com banco isolado quando constraints e transações precisarem ser comprovadas.

Execute os scripts disponíveis de lint, build e testes relevantes. Se o schema mudar, formate e valide o Prisma, gere o client, revise a migration e verifique o banco conforme a skill de migration. Informe claramente qualquer etapa que não pôde ser executada.

## Limites

- Não altere módulos, contratos ou dados fora do escopo para uniformizar o projeto.
- Não duplique lógica já disponível nem adicione dependências sem necessidade e justificativa.
- Não execute `prisma migrate reset`, `db push --accept-data-loss`, SQL destrutivo, remoção de volumes ou migrations que descartem dados sem autorização explícita para a ação e o banco exatos.
- Se o Prisma solicitar reset ou indicar perda de dados, interrompa e explique o motivo.
- Não crie commits nem faça push sem solicitação explícita.

Ao finalizar, liste arquivos alterados, endpoints e contratos criados ou modificados, decisões técnicas relevantes, tratamento de autorização e integridade, verificações executadas e pendências ou limitações reais.
