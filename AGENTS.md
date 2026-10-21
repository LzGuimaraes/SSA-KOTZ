# AGENTS.md — Saint Seiya Awakening

## 1. Contexto do projeto

O projeto é uma plataforma web de consulta e gerenciamento de informações do jogo Saint Seiya Awakening.

O sistema possui como objetivo disponibilizar uma área pública de consulta, autenticação de usuários e um painel administrativo para gerenciamento dos conteúdos.

### Objetivos

- Disponibilizar guias de personagens, habilidades, cosmos e estratégias.
- Organizar as informações em um banco de dados relacional.
- Permitir imagens associadas aos personagens e demais conteúdos.
- Implementar permissões para administração e colaboração.
- Disponibilizar uma interface responsiva e intuitiva.
- Garantir uma arquitetura organizada, escalável e de fácil manutenção.
- Permitir expansão futura sem comprometer funcionalidades existentes.

## 2. Stack tecnológica

### Backend

- Node.js
- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL
- API REST

### Frontend

- Vue 3
- TypeScript
- Composition API
- Vite
- Vue Router
- Pinia, quando necessário

### Infraestrutura

- Docker e Docker Compose
- Variáveis de ambiente
- Git para versionamento

### Regras

- Respeitar as versões e dependências instaladas.
- Não adicionar bibliotecas sem necessidade justificada.
- Priorizar recursos nativos das tecnologias utilizadas.
- Não substituir tecnologias existentes sem autorização.
- Seguir as configurações de lint, build e TypeScript do projeto.

## 3. Arquitetura do backend

Seguir a arquitetura modular do NestJS.

### Responsabilidades

- Controllers: receber requisições HTTP e delegar operações.
- Services: implementar regras de negócio.
- DTOs: definir contratos e validar dados de entrada.
- Prisma: realizar operações de persistência.
- Guards: aplicar autenticação e autorização.
- Modules: organizar funcionalidades relacionadas.

### Regras

- Não implementar regras de negócio nos controllers.
- Não acessar Prisma diretamente nos controllers.
- Utilizar injeção de dependências.
- Priorizar reutilização de services e providers existentes.
- Centralizar regras de negócio compartilhadas quando apropriado.
- Evitar duplicação de código.
- Não criar abstrações sem necessidade.
- Manter baixo acoplamento entre módulos.
- Respeitar a arquitetura existente antes de criar novos arquivos.
- Não criar métodos ou classes que apenas repassem chamadas sem necessidade arquitetural.

## 4. Banco de dados e Prisma

Utilizar PostgreSQL com Prisma ORM.

### Regras

- Definir relacionamentos explicitamente no schema Prisma.
- Utilizar migrations versionadas para alterações estruturais.
- Não utilizar `prisma db push` em ambientes compartilhados ou produção.
- Não apagar tabelas ou dados sem autorização.
- Utilizar transações quando houver operações dependentes que exijam atomicidade.
- Criar índices conforme necessidades reais de consulta.
- Evitar consultas desnecessárias e problemas N+1.
- Selecionar apenas os campos necessários quando apropriado.
- Respeitar constraints, chaves estrangeiras e integridade referencial.
- Reutilizar PrismaService e padrões existentes.
- Não duplicar consultas ou regras de persistência sem necessidade.
- Avaliar impactos antes de modificar entidades e relacionamentos.
- Não executar migrations em produção sem autorização explícita.

Antes de alterar o schema, analisar as migrations existentes, os relacionamentos e as funcionalidades dependentes.

## 5. Arquitetura do frontend

Utilizar Vue 3 com Composition API e TypeScript.

### Regras

- Separar páginas, componentes e serviços de API.
- Criar componentes reutilizáveis quando houver necessidade real.
- Priorizar composables existentes para lógica compartilhada.
- Reutilizar helpers, funções utilitárias e serviços globais já implementados.
- Não duplicar lógica existente em outros componentes.
- Evitar regras de negócio complexas dentro dos componentes.
- Utilizar Pinia apenas quando o estado precisar ser compartilhado.
- Manter estados locais quando não houver necessidade de gerenciamento global.
- Organizar rotas públicas e protegidas.
- Manter layouts responsivos.
- Evitar componentes excessivamente grandes.
- Não criar componentes genéricos para funcionalidades utilizadas apenas uma vez sem justificativa.
- Priorizar código declarativo, simples e legível.

## 6. Autenticação e permissões

Utilizar controle de acesso baseado em papéis.

### Papéis iniciais

- USER: consulta conteúdos e gerencia os próprios dados.
- EDITOR: cria e edita conteúdos conforme suas permissões.
- ADMIN: gerencia conteúdos, usuários e permissões.

### Regras

- Aplicar autorização sensível no backend.
- Não confiar somente em verificações do frontend.
- Armazenar senhas utilizando algoritmos apropriados de hash.
- Proteger endpoints administrativos.
- Validar a propriedade dos recursos quando necessário.
- Não expor tokens ou credenciais em logs.
- Não retornar informações sensíveis desnecessárias nas respostas.
- Respeitar o princípio do menor privilégio.
- Reutilizar guards, decorators e mecanismos de autorização existentes.
- Não duplicar verificações de permissão quando houver mecanismo centralizado adequado.

## 7. Padrões de código e Clean Code

O projeto deve priorizar código limpo, reutilizável, legível e de fácil manutenção.

### 7.1. Organização e legibilidade

- Utilizar TypeScript com tipagem adequada.
- Evitar `any`, salvo justificativa técnica.
- Utilizar nomes descritivos para variáveis, funções, métodos e classes.
- Escrever identificadores em inglês.
- Utilizar PascalCase para classes e camelCase para variáveis e funções.
- Manter funções pequenas e com responsabilidades bem definidas.
- Aplicar o princípio da responsabilidade única quando apropriado.
- Evitar condicionais e estruturas excessivamente complexas.
- Priorizar retornos antecipados quando melhorarem a legibilidade.
- Evitar números e strings mágicas quando prejudicarem a compreensão.
- Manter consistência com os padrões existentes.
- Não implementar soluções excessivamente complexas para problemas simples.

### 7.2. Reutilização de código

Antes de implementar uma nova função, método, service, composable ou helper:

1. Verificar se já existe uma implementação equivalente.
2. Avaliar se a implementação existente pode ser reutilizada.
3. Priorizar funções e serviços compartilhados apropriados.
4. Evitar criar implementações duplicadas.
5. Criar novas abstrações somente quando houver benefício concreto.

Diretrizes:

- Aplicar DRY sem comprometer a legibilidade.
- Não duplicar validações ou regras de negócio existentes.
- Reutilizar serviços compartilhados do NestJS.
- Reutilizar composables e utilitários existentes no Vue.
- Preferir dependências explícitas a funções globais com estado compartilhado.
- Não transformar funcionalidades específicas em abstrações genéricas sem necessidade.
- Não modificar funções compartilhadas de maneira que comprometa seus consumidores.
- Priorizar baixo acoplamento e alta coesão.

### 7.3. Comentários e documentação

**Utilizar o mínimo possível de comentários no código.**

- Não adicionar comentários para explicar código evidente.
- Não comentar cada função, variável ou bloco.
- Não adicionar comentários decorativos.
- Não criar comentários apenas para separar visualmente trechos de código.
- Não manter código comentado sem necessidade.
- Priorizar nomes expressivos e estruturas claras.
- Utilizar comentários somente quando explicarem decisões técnicas, regras complexas ou comportamentos não evidentes.
- Preservar comentários necessários para documentação pública, contratos ou ferramentas.
- Não remover comentários importantes existentes sem avaliar sua finalidade.
- Não adicionar JSDoc automaticamente a funções internas simples.

O código deve ser compreensível principalmente por sua estrutura e nomenclatura, sem depender de comentários explicativos.

### 7.4. Refatoração

- Refatorar apenas quando necessário para atender à tarefa ou corrigir um problema identificado.
- Não refatorar módulos não relacionados.
- Evitar alterações exclusivamente estéticas fora do escopo.
- Preservar os contratos existentes.
- Não modificar comportamentos funcionais durante refatorações, salvo solicitação.
- Priorizar alterações pequenas e verificáveis.

## 8. Comportamento esperado do agente de IA

### Antes de implementar

- Ler as instruções aplicáveis do `AGENTS.md`.
- Analisar os arquivos relacionados à tarefa.
- Identificar padrões arquiteturais existentes.
- Procurar funções, services, helpers e composables reutilizáveis.
- Verificar dependências e impactos da alteração.
- Consultar Skills pertinentes, quando disponíveis.
- Evitar assumir estruturas ou funcionalidades que não foram verificadas.

### Durante a implementação

- Alterar somente os arquivos necessários.
- Seguir as convenções do projeto.
- Priorizar Clean Code e reutilização.
- Evitar comentários desnecessários.
- Não criar funcionalidades não solicitadas.
- Não instalar dependências desnecessárias.
- Não refatorar código não relacionado.
- Preservar compatibilidade com funcionalidades existentes.
- Não modificar arquivos `.env` contendo segredos.
- Não sobrescrever alterações do desenvolvedor.
- Evitar gerar arquivos ou abstrações desnecessárias.

### Depois da implementação

- Executar verificações pertinentes quando disponíveis.
- Verificar erros de tipagem.
- Executar lint, build ou testes relevantes, conforme aplicável.
- Revisar as alterações realizadas.
- Informar arquivos modificados.
- Explicar resumidamente decisões técnicas importantes.
- Informar testes executados e seus resultados.
- Apontar limitações ou verificações não realizadas.
- Destacar migrations necessárias.
- Não declarar que uma funcionalidade foi testada quando não houve verificação.

## 9. Aprendizado do desenvolvedor

O projeto também possui finalidade educacional.

Ao implementar funcionalidades:

- Explicar decisões arquiteturais importantes.
- Destacar conceitos relevantes de NestJS, Prisma e Vue.
- Explicar os motivos de alterações significativas.
- Priorizar soluções compreensíveis.
- Evitar complexidade desnecessária.
- Destacar padrões que possam ser reutilizados em outras funcionalidades.
- Explicar problemas técnicos encontrados e suas soluções.
- Não fornecer explicações excessivamente extensas para alterações simples.

Não é necessário explicar cada linha de código.

O objetivo é equilibrar produtividade, qualidade técnica e aprendizado.

## 10. Git e Conventional Commits

Utilizar o padrão Conventional Commits.

### Formato

`type(scope): description`

As mensagens devem ser escritas em inglês, preferencialmente com verbos no imperativo e sem ponto final.

### Tipos permitidos

- `feat`: nova funcionalidade.
- `fix`: correção de bug.
- `refactor`: alteração estrutural sem mudança de comportamento.
- `perf`: melhoria de performance.
- `docs`: documentação.
- `test`: criação ou alteração de testes.
- `chore`: manutenção geral.
- `style`: alterações de formatação sem mudança funcional.
- `build`: alterações no sistema de build ou dependências.
- `ci`: alterações em integração e entrega contínuas.

### Exemplos

- `feat(characters): add character registration`
- `fix(auth): handle expired tokens`
- `refactor(cosmos): reuse shared validation logic`
- `perf(characters): optimize character queries`
- `docs(api): update endpoint documentation`
- `test(users): add service unit tests`
- `chore(deps): update dependencies`
- `ci(deploy): update deployment workflow`

### Regras

- Analisar `git status` e `git diff` antes de preparar commits.
- Utilizar o tipo adequado às alterações.
- Definir o scope conforme o módulo afetado.
- Manter mensagens curtas, claras e descritivas.
- Separar alterações independentes em commits diferentes quando apropriado.
- Não incluir arquivos sensíveis.
- Não incluir mudanças não relacionadas à tarefa.
- Não utilizar `git add .` indiscriminadamente.
- Não alterar configurações globais do Git.
- Não executar commits sem solicitação explícita.
- Não executar push sem autorização.
- Não realizar operações destrutivas no histórico Git sem autorização.
- Respeitar a Skill `git-commit`, quando disponível.

## 11. Skills do Codex

O projeto pode utilizar Skills especializadas em `.agents/skills/`.

### Skills previstas

- `nest-crud`: implementação e manutenção de CRUDs NestJS.
- `prisma-migration`: modelagem relacional e migrations Prisma.
- `code-review`: revisão técnica e identificação de problemas.
- `git-commit`: padronização de commits e organização de alterações.

### Regras de utilização

- Utilizar Skills relevantes conforme a tarefa e as instruções de ativação.
- Respeitar as regras gerais deste `AGENTS.md`.
- Evitar duplicar regras globais dentro das Skills.
- Não executar operações destrutivas sem autorização.
- Não realizar commits automaticamente após implementar funcionalidades.
- Priorizar implementação, verificação e revisão antes do versionamento.
- Não presumir que uma Skill substitui a necessidade de analisar o código existente.

## 12. Restrições importantes

- Não executar operações destrutivas no banco sem autorização.
- Não remover funcionalidades existentes sem solicitação.
- Não alterar a arquitetura principal sem justificativa e aprovação.
- Não substituir bibliotecas existentes sem necessidade.
- Não assumir que todos os dados pertencem ao usuário autenticado.
- Não implementar permissões somente no frontend.
- Não adicionar comentários desnecessários.
- Não duplicar funcionalidades que já possuem implementação reutilizável.
- Não criar abstrações prematuras.
- Não modificar arquivos fora do escopo sem necessidade técnica justificada.
- Não executar commits ou push sem autorização.
- Não apresentar código não testado como se estivesse validado.

## 13. Princípio geral de desenvolvimento

Toda implementação deve priorizar:

1. **Correção:** atender aos requisitos sem comprometer funcionalidades existentes.
2. **Simplicidade:** implementar a solução mais simples que resolva corretamente o problema.
3. **Reutilização:** aproveitar componentes, funções e serviços existentes.
4. **Legibilidade:** produzir código compreensível sem comentários excessivos.
5. **Manutenibilidade:** facilitar futuras alterações e correções.
6. **Segurança:** proteger dados, permissões e operações sensíveis.
7. **Consistência:** respeitar a arquitetura e os padrões do projeto.

**Regra principal: antes de criar algo novo, verificar o que já existe e pode ser reutilizado.**