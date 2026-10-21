# AGENTS.md — Saint Seiya Awakening

## 1. Contexto do projeto

O projeto é uma plataforma web de consulta e gerenciamento de informações do jogo Saint Seiya Awakening.

O sistema terá uma área pública de consulta, autenticação de usuários e um painel administrativo para gerenciar os conteúdos.

Objetivos:
- Disponibilizar guias de personagens, habilidades e cosmos.
- Organizar informações em um banco de dados relacional.
- Permitir imagens associadas aos personagens e demais conteúdos.
- Implementar permissões para administração e colaboração.
- Permitir expansão futura sem comprometer a arquitetura existente.

## 2. Stack tecnológica

Backend:
- Node.js
- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL
- API REST

Frontend:
- Vue 3
- TypeScript
- Composition API
- Vite
- Vue Router
- Pinia, quando necessário

Infraestrutura:
- Docker e Docker Compose
- Variáveis de ambiente para configuração
- Git para versionamento

Utilizar as versões e bibliotecas já instaladas no projeto. Não adicionar dependências sem justificativa.

## 3. Arquitetura do backend

Seguir a arquitetura modular do NestJS.

- Controllers recebem requisições HTTP e delegam a lógica.
- Services concentram regras de negócio.
- DTOs validam entradas e definem contratos.
- Prisma realiza o acesso ao banco de dados.
- Guards e mecanismos de autorização protegem recursos.
- Modules agrupam funcionalidades relacionadas.

Regras:
- Não colocar regras de negócio nos controllers.
- Não acessar o Prisma diretamente nos controllers.
- Evitar duplicação de código.
- Não criar abstrações sem necessidade real.
- Respeitar a organização existente antes de criar novos arquivos.

## 4. Banco de dados e Prisma

- Utilizar PostgreSQL como banco relacional.
- Definir relacionamentos explicitamente no schema Prisma.
- Utilizar migrations versionadas para alterações estruturais.
- Não utilizar `prisma db push` em ambientes compartilhados ou produção.
- Não apagar tabelas ou dados sem autorização.
- Utilizar transações quando houver operações dependentes.
- Criar índices de acordo com as consultas necessárias.
- Evitar consultas desnecessárias e problemas N+1.

Antes de modificar o schema, verificar o impacto nos relacionamentos e nos dados existentes.

## 5. Arquitetura do frontend

Utilizar Vue 3 com Composition API e TypeScript.

- Separar páginas, componentes e serviços de API.
- Utilizar componentes reutilizáveis.
- Utilizar composables quando houver lógica compartilhada.
- Evitar regras de negócio complexas dentro dos componentes.
- Manter estados locais quando não houver necessidade de estado global.
- Organizar rotas públicas e protegidas.
- Manter layouts responsivos para desktop e dispositivos móveis.

## 6. Autenticação e permissões

O sistema terá permissões baseadas em papéis.

Papéis iniciais:
- USER: consulta conteúdos e gerencia seus próprios dados.
- EDITOR: cria e edita conteúdos conforme suas permissões.
- ADMIN: gerencia conteúdos, usuários e permissões.

Regras:
- Toda autorização sensível deve ocorrer no backend.
- Não confiar apenas nas verificações do frontend.
- Nunca armazenar senhas em texto puro.
- Proteger endpoints administrativos.
- Validar a propriedade dos recursos quando necessário.
- Não expor tokens ou credenciais nos logs.

## 7. Padrões de código

- Utilizar TypeScript com tipagem explícita e adequada.
- Evitar `any`, exceto quando tecnicamente justificado.
- Priorizar código simples e legível.
- Utilizar nomes de classes, funções e variáveis em inglês.
- Utilizar PascalCase para classes e camelCase para variáveis e funções.
- Seguir os padrões de formatação e lint existentes.
- Evitar comentários que apenas repetem o código.
- Documentar decisões técnicas relevantes.

## 8. Comportamento esperado do agente de IA

Antes de implementar:
- Analisar os arquivos relacionados à tarefa.
- Identificar padrões existentes.
- Considerar os impactos sobre outras funcionalidades.
- Reutilizar soluções já implementadas.

Durante a implementação:
- Alterar somente o necessário para atender à solicitação.
- Não refatorar módulos não relacionados.
- Não criar funcionalidades que não foram solicitadas.
- Não instalar dependências desnecessárias.
- Preservar compatibilidade com funcionalidades existentes.
- Não modificar arquivos `.env` contendo segredos.

Depois da implementação:
- Executar verificações pertinentes quando disponíveis.
- Informar quais arquivos foram modificados.
- Explicar resumidamente as decisões técnicas.
- Informar testes executados, resultados e limitações.
- Destacar eventuais migrations necessárias.

## 9. Aprendizado do desenvolvedor

Este projeto também possui finalidade educacional.

Ao implementar funcionalidades:
- Explicar decisões arquiteturais importantes.
- Destacar conceitos relevantes de NestJS, Prisma e Vue.
- Priorizar soluções compreensíveis e de fácil manutenção.
- Não aumentar desnecessariamente a complexidade.
- Explicar os motivos de mudanças significativas.

Não é necessário explicar cada linha de código.

## 10. Git e commits

- Não realizar commits automaticamente sem solicitação.
- Não executar push sem autorização.
- Não alterar configurações globais do Git.
- Não incluir arquivos sensíveis no versionamento.
- Manter as alterações restritas à tarefa.
- Seguir o padrão de commits existente no repositório.

## 11. Restrições importantes

- Não executar operações destrutivas no banco sem autorização.
- Não remover funcionalidades existentes sem solicitação.
- Não alterar a arquitetura principal sem justificativa e aprovação.
- Não substituir bibliotecas existentes sem necessidade.
- Não assumir que todos os dados pertencem ao usuário autenticado.
- Não implementar permissões somente no frontend.
- Não apresentar código não testado como se estivesse validado.