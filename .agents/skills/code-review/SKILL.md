---
name: code-review
description: Revise tecnicamente código TypeScript, NestJS, Prisma, PostgreSQL e Vue 3. Use automaticamente em pedidos de code review, revisão de código ou arquivos, análise de diff, avaliação de commits e pull requests, priorizando bugs, regressões, segurança, integridade, desempenho e cobertura de testes.
---

# Code Review

Produza uma revisão baseada em evidências. Não modifique código, configuração ou testes durante a revisão, salvo solicitação explícita do usuário. Não crie commits nem faça push.

## Definir o escopo

- Leia `AGENTS.md` e identifique a arquitetura, os padrões e os comandos disponíveis.
- Revise preferencialmente o diff, commit, pull request ou arquivos indicados. Se o alvo não estiver explícito, use as alterações atuais do Git e deixe essa escolha clara.
- Leia contexto suficiente fora do diff para validar o comportamento: interfaces, call sites, schema Prisma, migrations, guards, DTOs, services, stores, rotas e testes relacionados.
- Não transforme uma revisão delimitada em auditoria integral do repositório. Registre áreas relevantes que ficaram fora do escopo.
- Preserve alterações locais. Não execute formatadores com `--write`, linters com `--fix`, geradores, migrations ou comandos que alterem dados.

## Buscar problemas materiais

Concentre a revisão em efeitos observáveis e riscos concretos:

- bugs, regressões, condições de corrida, estados inválidos e fluxos assíncronos incompletos;
- validação ausente ou divergente entre DTO, domínio, banco e interface;
- autenticação, autorização, propriedade de recursos, exposição de dados, mass assignment e tratamento inseguro de entrada;
- inconsistências de tipos, nulabilidade, enums, datas, IDs e serialização;
- erros HTTP incorretos, exceções engolidas, vazamento de detalhes internos e mensagens enganosas;
- integridade relacional, unicidade, ações referenciais, transações, ordem de migrations e preservação de dados;
- consultas N+1, leituras ou relações desnecessárias, paginação sem limite ou ordem estável, falta de índice relevante e operações com lock excessivo;
- contratos incompatíveis entre controllers e clientes Vue, incluindo payloads, status, paginação, estados de carregamento e erros;
- testes ausentes quando deixarem lógica nova ou corrigida sem proteção significativa.

Para NestJS, confirme que controllers delegam regras aos services, DTOs são realmente aplicados pelo pipeline e módulos registram as dependências corretas. Para Prisma, confira consultas, transações, seleção de campos, erros conhecidos e concorrência; uma verificação prévia não substitui constraints. Para Vue 3, examine reatividade, ciclo de vida, stores, router, chamadas Axios, estados concorrentes e renderização de conteúdo não confiável.

Avalie legibilidade, acoplamento e manutenção apenas quando houver custo técnico concreto. Não reporte preferências de estilo, renomes subjetivos ou refatorações estéticas como defeitos.

## Exigir evidência

Antes de registrar um achado:

1. Trace o caminho executável e as condições necessárias.
2. Verifique se validações, constraints, guards ou chamadores já impedem o problema.
3. Compare com o comportamento anterior quando alegar regressão.
4. Confirme o contrato esperado em código, testes, documentação ou padrões consistentes do projeto.

Classifique a confiança de cada item:

- **Bug confirmado:** o código demonstra o comportamento incorreto ou um teste o reproduz.
- **Risco plausível:** depende de condição realista ainda não comprovada; declare a premissa e a evidência ausente.
- **Sugestão opcional:** melhoria sem falha atual demonstrada. Mantenha separada dos problemas e inclua somente quando tiver valor claro.

Não invente requisitos, volume de dados, ameaças, relações ou comportamento de produção. Se a evidência for insuficiente, faça uma pergunta objetiva ou registre a limitação em vez de afirmar um defeito.

## Priorizar por severidade

Ordene os problemas pela maior severidade e use estes critérios:

- **Crítica:** exploração direta, bypass amplo de autorização, perda irreversível de dados, indisponibilidade sistêmica ou comprometimento de segredos.
- **Alta:** falha em fluxo principal, quebra relevante de contrato, corrupção ou exposição material de dados, autorização incorreta ou regressão com alto impacto.
- **Média:** falha limitada, risco de integridade ou desempenho relevante sob condições realistas, tratamento de erro incorreto ou lacuna de teste que oculta comportamento importante.
- **Baixa:** problema real de alcance pequeno, manutenção com consequência concreta ou caso de borda de baixo impacto.

Se a probabilidade reduzir materialmente o risco, reflita isso na severidade e explique a condição necessária.

## Formato de cada achado

Apresente os achados antes do resumo. Para cada problema, informe:

1. severidade, confiança e título específico;
2. arquivo e linha exata quando disponíveis;
3. evidência no código e por que as proteções existentes não bastam;
4. impacto e um cenário mínimo de reprodução;
5. correção sugerida, proporcional ao problema.

Agrupe ocorrências com a mesma causa em um achado e cite os locais relevantes. Explique o conceito técnico necessário para entender a falha, em poucas frases e ligado ao caso concreto.

Exemplo de título: `Alta · Bug confirmado — atualização permite alterar recurso de outro usuário`. Evite títulos vagos como “problema de segurança” ou “melhorar código”.

## Executar verificações

Quando houver testes ou checks disponíveis, execute apenas os pertinentes e seguros. Comece pelos testes diretamente relacionados; use lint, checagem de tipos e build quando ajudarem a validar o diff. Não instale dependências ou inicie infraestrutura externa somente para ampliar uma revisão sem autorização ou necessidade clara.

Informe cada comando executado, resultado e falhas relevantes. Diferencie claramente teste aprovado, teste falho e verificação não executada. Uma suíte verde não elimina problemas sem cobertura.

## Entregar a revisão

Use esta ordem:

1. achados confirmados e riscos plausíveis, ordenados por severidade;
2. perguntas ou premissas que alterem a conclusão;
3. resumo objetivo do que foi revisado;
4. testes e verificações executados;
5. limitações da revisão;
6. sugestões opcionais, somente se úteis.

Se não houver achados, diga explicitamente que nenhum problema material foi identificado. Ainda informe o escopo, as verificações executadas e as limitações; não declare o código livre de defeitos.
