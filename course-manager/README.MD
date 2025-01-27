# Sobre o projeto

Este projeto é uma aplicação desenvolvida para atividade de Reuso de Software.

# Como rodar

Siga os passos abaixo para executar o projeto localmente:

### Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 20.11.0)
- [Outras dependências específicas, se necessário]

### Passo a passo
1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

#### Frontend

1. Instale as dependências:
  
   ```bash
   cd course-manager-app
   npm install
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

#### Backend

1. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e preencha com os valores necessários (veja o exemplo em `.env.example`).

2. Rode o ambiente virtual:

   ```bash
   poetry shell
   ```

3. Instale as depedências:

   ```bash
   poetry install
   ```

4. Rode o servidor de desenvolvimento:
   ```
   task run
   ```

Agora você está pronto para explorar o projeto!
