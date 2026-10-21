---
name: git-commit
description: Prepare e crie commits Git seguros seguindo Conventional Commits. Use automaticamente quando o usuário pedir para criar ou fazer um commit, organizar alterações em commits, preparar o staging ou definir mensagens de commit; execute `git commit` somente mediante pedido explícito.
---

# Git Commit

Organize commits coerentes sem perder trabalho do usuário. Um pedido para sugerir mensagem, revisar alterações ou planejar commits não autoriza criar commits. Um pedido explícito como “faça o commit” ou “crie os commits” autoriza executar `git commit` dentro do escopo informado, mas nunca autoriza push.

## Entender o repositório

Antes de preparar um commit:

- Leia `AGENTS.md` e outras instruções aplicáveis ao caminho alterado.
- Inspecione a branch, `git status --short`, o diff não staged, o diff staged e arquivos não rastreados relevantes.
- Consulte commits recentes para preservar convenções adicionais do repositório sem contrariar este padrão.
- Diferencie alterações produzidas na tarefa atual, mudanças anteriores do usuário e arquivos gerados.
- Não modifique o conteúdo dos arquivos apenas para facilitar o commit, salvo solicitação explícita.

Não presuma que tudo no worktree pertence ao mesmo trabalho. Quando a autoria ou a relação de uma alteração for incerta, preserve-a fora do commit ou peça esclarecimento antes de mudar o staging.

## Definir commits por responsabilidade

Cada commit deve representar uma unidade lógica que possa ser revisada e, quando possível, revertida isoladamente. Separe commits quando as alterações tiverem responsabilidades independentes, como implementação, migration, testes ou documentação sem dependência direta.

Não fragmente artificialmente mudanças que precisam permanecer juntas para compilar, migrar ou explicar uma única decisão. Antes de criar vários commits, determine a ordem de dependência e execute verificações no estado relevante.

Use somente estes tipos:

- `feat`: novo comportamento disponível ao usuário ou consumidor;
- `fix`: correção de comportamento incorreto;
- `refactor`: mudança interna sem alterar comportamento esperado;
- `perf`: melhoria mensurável ou claramente fundamentada de desempenho;
- `docs`: somente documentação;
- `test`: somente testes ou infraestrutura diretamente ligada a testes;
- `chore`: manutenção que não se encaixa nas categorias anteriores;
- `style`: formatação ou estilo sem mudança de comportamento;
- `build`: dependências, empacotamento ou sistema de build;
- `ci`: pipelines e automação de integração ou entrega contínua.

Escolha o tipo pela finalidade real da mudança, não pelos nomes dos arquivos. Escolha um scope curto, em inglês e coerente com o módulo, domínio ou subsistema predominante, como `auth`, `characters`, `cosmos`, `backend`, `frontend`, `db` ou `deps`.

## Escrever a mensagem

Use o formato:

```text
type(scope): short description in English
```

A descrição deve ser curta, específica, no imperativo ou presente, começar em minúscula e não terminar com ponto. Evite mensagens genéricas como `update files`, `changes` ou `fix stuff`.

Exemplos:

```text
feat(characters): add character registration
fix(auth): handle expired tokens
refactor(cosmos): reuse shared validation logic
perf(characters): optimize listing query
chore(deps): update dependencies
```

Use corpo ou rodapé somente quando explicarem motivação, impacto, referência ou incompatibilidade que não caiba no título. Marque breaking changes apenas quando o contrato realmente for incompatível e descreva a migração necessária.

## Preparar o staging com segurança

- Examine cada arquivo não rastreado antes de incluí-lo.
- Verifique `.gitignore` e exclua `.env`, credenciais, chaves, tokens, dumps, dados pessoais, logs, caches, artefatos de build e arquivos locais do editor, salvo quando um exemplo sanitizado fizer parte intencional do projeto.
- Adicione caminhos explícitos com `git add -- <paths>`. Não use `git add .`, `git add -A` ou globs amplos como atalho.
- Revise `git diff --cached` após cada alteração do staging. Confirme que ele contém somente a responsabilidade do commit e que não há segredos ou mudanças acidentais.
- Não remova, substitua ou reorganize alterações que já estavam staged sem entender a intenção do usuário. Se o staging existente misturar responsabilidades e não houver forma segura de preservá-lo, peça orientação.
- Não sobrescreva arquivos, descarte hunks ou use comandos de restauração para limpar o worktree.

Antes do commit, execute `git diff --cached --check` e confirme que o staging não está vazio.

## Verificar a mudança

Execute as verificações pertinentes definidas no repositório, proporcionais aos arquivos staged: testes focados, lint, checagem de tipos, build, validação de schema ou outras verificações aplicáveis. Evite repetir checks aprovados quando as entradas não mudaram.

Se uma verificação falhar por causa das alterações do commit, não crie o commit como se estivesse válido; explique a falha e corrija somente quando a solicitação também autorizar essa alteração. Se a falha for anterior ou não relacionada, registre a evidência e preserve o escopo.

Não afirme que executou uma verificação que não foi executada.

## Criar e confirmar o commit

Somente após pedido explícito:

1. Revise novamente o diff staged e a mensagem proposta.
2. Execute `git commit` sem alterar configurações globais ou locais de identidade.
3. Confirme o hash e a mensagem produzidos com o log.
4. Verifique o status restante para informar mudanças ainda não commitadas.

Não use comandos destrutivos ou de reescrita de histórico, incluindo `git reset --hard`, `git clean`, checkout destrutivo, rebase ou amend, sem uma solicitação explícita e específica. Não faça push, force push, merge, tag ou publicação como consequência de um pedido de commit.

Ao concluir, informe o hash abreviado, a mensagem exata, a responsabilidade incluída, as verificações executadas e o estado restante do worktree. Se nenhum commit for criado, explique objetivamente o impedimento.
