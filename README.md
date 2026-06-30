# Gestão de Usuários — Pipeline CI/CD com GitHub Actions

## Sobre o Projeto

Projeto Node.js com testes automatizados para validação de login de usuários, integrado a uma pipeline de integração contínua utilizando GitHub Actions.

## Tecnologias Utilizadas

- **Node.js** — ambiente de execução
- **Mocha** — framework de testes
- **mocha-junit-reporter** — geração de relatório de testes em formato JUnit (XML)
- **GitHub Actions** — pipeline CI/CD

## Como Executar Localmente

### Pré-requisitos

- Node.js instalado

### Instalação

```bash
npm install
```

### Executar os testes

```bash
npm test
```

### Executar os testes com geração de relatório (modo CI)

```bash
npm run test:ci
```

O relatório será gerado em `test-results/results.xml`.

---

## Pipeline CI/CD

A pipeline está definida em `.github/workflows/ci.yml` e contempla os seguintes gatilhos e funcionalidades:

### Gatilhos (Triggers)

#### 1. Execução por Push

```yaml
on:
  push:
    branches: [main]
```

A pipeline é disparada automaticamente sempre que um `git push` é realizado na branch `main`. Isso garante que todo novo código enviado ao repositório seja validado imediatamente.

#### 2. Execução Manual

```yaml
  workflow_dispatch:
```

Permite disparar a pipeline manualmente pela interface do GitHub, na aba **Actions** → botão **"Run workflow"**. Útil para reexecutar sem precisar fazer um novo push.

#### 3. Execução Agendada (Schedule)

```yaml
  schedule:
    - cron: '0 8 * * 1'  # Toda segunda-feira às 8h UTC
```

A pipeline é executada automaticamente toda segunda-feira às 8h UTC, independentemente de novos pushes. Utiliza a sintaxe **cron**, onde cada campo representa:

```
┌─ minuto (0-59)
│  ┌─ hora (0-23)
│  │  ┌─ dia do mês (1-31)
│  │  │  ┌─ mês (1-12)
│  │  │  │  ┌─ dia da semana (0=domingo, 1=segunda...)
│  │  │  │  │
0  8  *  *  1
```

> **Importante:** o GitHub Actions usa horário **UTC**. Atrasos de até 30 minutos podem ocorrer em repositórios com pouca atividade.

### Etapas da Pipeline (Steps)

| Step | Descrição |
|---|---|
| Checkout do código | Baixa o código do repositório para o runner |
| Configurar Node.js | Instala o Node.js 20 com cache do npm |
| Instalar dependências | Executa `npm ci` para instalação limpa e reproduzível |
| Executar testes e gerar relatório | Roda `npm run test:ci` gerando o XML de resultados |
| Publicar relatório de testes | Exibe os resultados na interface do GitHub via `dorny/test-reporter` |
| Armazenar relatório como artefato | Salva o XML para download via `actions/upload-artifact` |

### Geração e Publicação do Relatório de Testes

O relatório é gerado em dois formatos:

1. **Visualização na pipeline** — a action `dorny/test-reporter@v1` lê o XML e exibe os testes diretamente na interface do GitHub, mostrando quais passaram e quais falharam.

2. **Artefato para download** — a action `actions/upload-artifact@v4` armazena o arquivo `test-results/results.xml` como artefato da execução, disponível para download por 90 dias na aba Actions.

O uso de `if: always()` em ambos os steps garante que o relatório seja gerado mesmo quando os testes falham.

---

## Como Visualizar os Resultados

1. Acesse o repositório no GitHub
2. Clique na aba **Actions**
3. Selecione a execução desejada
4. Veja o relatório na seção **"Relatório Mocha"**
5. Para baixar o XML, acesse a seção **"Artifacts"** no final da página

### Identificando o tipo de execução

Cada execução na aba Actions indica como foi disparada:

- `push` — disparada por um novo commit
- `schedule` — disparada automaticamente pelo cron
- `workflow_dispatch` — disparada manualmente

---

## Estrutura do Projeto

```
gestao-usuarios/
├── .github/
│   └── workflows/
│       └── ci.yml        # Definição da pipeline CI/CD
├── src/
│   └── login.js          # Lógica de negócio
├── test/
│   └── login.test.js     # Testes automatizados
├── package.json
└── README.md
```
