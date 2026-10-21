---
name: prisma-migration
description: Analise e evolua o schema Prisma deste projeto NestJS com PostgreSQL, planejando ou implementando migrations que preservem dados e relacionamentos. Use em mudanças de modelos, campos, índices, constraints, chaves estrangeiras ou histórico de migrations; não use para consultas ou regras de negócio sem alteração estrutural no banco.
---

# Prisma Migration

Prepare alterações estruturais do banco com evidências suficientes para avaliar segurança, impacto e reversibilidade. Respeite o escopo pedido: se o usuário solicitar apenas análise ou proposta, não altere o schema, não gere arquivos e não aplique migrations.

## Levantar o estado atual

Antes de propor uma alteração:

- Leia `AGENTS.md`, `backend/prisma/schema.prisma`, `backend/prisma.config.ts`, `docs/database.md` e os scripts Prisma em `backend/package.json`.
- Inspecione `backend/prisma/migrations/` quando existir e verifique o estado do Git para preservar trabalho não relacionado.
- Localize no backend os DTOs, services, queries e tipos gerados afetados. Localize no frontend os contratos que dependem dos campos alterados quando isso mudar a API.
- Consulte o banco somente quando a tarefa exigir dados reais e houver uma conexão autorizada. Não imprima `DATABASE_URL`, senhas ou outros segredos.
- Diferencie o schema desejado, o histórico de migrations e o estado real do banco. Não assuma que estão sincronizados.

## Avaliar impacto relacional e nos dados

Para cada mudança, determine:

- cardinalidade e lado proprietário da relação;
- campos escalares da chave estrangeira, nulabilidade e ordem de criação;
- ações `onDelete` e `onUpdate` e o efeito em registros dependentes;
- índices, chaves únicas e possíveis duplicidades;
- registros órfãos, valores nulos e dados incompatíveis com a nova constraint;
- impacto de renomes e mudanças de tipo, evitando que o Prisma os trate como remoção e recriação;
- ordem de deploy quando versões antigas e novas da aplicação podem coexistir.

Apresente riscos concretos e as consultas de pré-verificação necessárias. Se faltarem volume de dados, distribuição dos valores ou política de retenção, declare a lacuna e escolha a alternativa que preserve os dados.

## Projetar uma migration segura

Prefira mudanças aditivas e compatíveis. Para mudanças incompatíveis, use etapas de expansão, preenchimento e contração:

1. Adicione estruturas novas sem invalidar os dados ou o código atual.
2. Preencha ou transforme os dados com SQL explícito, idempotente quando viável, e valide o resultado.
3. Atualize a aplicação para usar a nova estrutura.
4. Torne constraints mais rígidas ou remova a estrutura antiga apenas quando os dados e o deploy permitirem.

Trate estes casos com atenção especial:

- Para renomear tabela, coluna, índice ou constraint, gere a migration e substitua operações de `DROP`/`ADD` por `ALTER ... RENAME` quando isso representar a intenção real.
- Para adicionar coluna obrigatória a uma tabela com dados, crie-a inicialmente opcional ou com default adequado, faça o backfill, confirme ausência de `NULL` e só então aplique `NOT NULL`.
- Para mudar um tipo de forma não trivial, use uma coluna intermediária ou uma cláusula `USING` comprovadamente segura; verifique conversões inválidas antes.
- Antes de `UNIQUE`, chave estrangeira ou `NOT NULL`, procure duplicidades, órfãos e nulos. Não apague registros para fazer a constraint passar sem decisão explícita do usuário.
- Escolha índices a partir das consultas esperadas. Considere custo de lock e tempo de criação em tabelas grandes; documente quando uma operação precisar ocorrer fora de uma transação.
- Defina ações referenciais explicitamente quando o comportamento padrão não expressar a regra de domínio.

Uma estratégia de rollback não deve prometer recuperar dados descartados. Quando a reversão depender de backup, snapshot ou migration compensatória, declare isso antes da aplicação.

## Gerar e revisar

Quando o usuário pedir implementação:

1. Altere `backend/prisma/schema.prisma` somente no escopo solicitado.
2. Execute os scripts do projeto para formatar, validar e gerar o client.
3. Gere a migration como rascunho com `prisma migrate dev --create-only --name <nome>` no workspace `backend`, desde que o banco seja um ambiente local de desenvolvimento e o comando não exija reset.
4. Leia todo o SQL gerado. Corrija renomes, ordem das operações, backfills, constraints, índices e SQL específico do PostgreSQL antes de considerar a migration pronta.
5. Confirme que o SQL corresponde ao diff do schema e que não contém remoções ou reconstruções inesperadas.

Se não houver banco disponível, prepare o schema e a proposta de SQL quando isso for útil, mas registre que a geração ou execução real não foi verificada. Não fabrique uma migration como se tivesse sido produzida e testada pelo Prisma.

## Limites de autorização

Não execute comandos ou SQL destrutivos sem autorização explícita para o banco e a ação exatos. Isso inclui:

- `prisma migrate reset`;
- `prisma db push --accept-data-loss`;
- `DROP`, `TRUNCATE`, exclusão em massa ou alteração que descarte valores;
- remoção de volumes Docker ou recriação de bancos;
- aplicação ou resolução manual de migrations em staging ou produção.

Se o Prisma solicitar reset, interrompa o comando e explique o drift ou conflito encontrado. Não use `db push` para substituir migrations versionadas. Use `prisma migrate deploy` somente quando o usuário tiver solicitado a aplicação naquele ambiente e os pré-requisitos de backup e compatibilidade tiverem sido atendidos.

## Verificar a alteração

Adapte a verificação ao risco da migration e registre os resultados:

- `prisma format`, `prisma validate` e `prisma generate` pelos scripts existentes;
- inspeção do SQL e `prisma migrate status` quando houver conexão;
- consultas antes e depois para contagem de registros, nulos, duplicidades, órfãos e valores convertidos;
- aplicação em banco descartável ou cópia representativa antes de ambientes compartilhados, quando a mudança manipular dados;
- build e testes relevantes do NestJS; valide também consumidores da API quando o contrato mudar;
- confirmação final das constraints, índices e relações no PostgreSQL.

Não apresente como executada uma etapa que foi apenas proposta. Ao concluir, informe o diff do schema, arquivos de migration, riscos aos dados e relacionamentos, verificações realizadas, limitações e qualquer ação que ainda dependa de autorização.
