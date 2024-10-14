# Task Management API

Uma API simples para gerenciamento de tarefas, implementada com NestJS e PostgreSQL. Inclui funcionalidades de autenticação de usuário via JWT (JSON Web Token).

# Funcionalidades
  - CRUD de Tarefas: Criar, listar, atualizar e remover tarefas.
  - Autenticação de Usuário: Cadastro e login com autenticação JWT.
  - Autorização: Apenas usuários autenticados podem adicionar, atualizar ou remover tarefas.
  - Filtragem de Tarefas: Listar tarefas pendentes ou concluídas.

# Tecnologias
- NestJS: Framework utilizado para construir a API.
- PostgreSQL: Banco de dados para armazenamento de tarefas e usuários.
- Prisma: ORM utilizado para interagir com o banco de dados.
- JWT: Para autenticação segura com tokens.

# Instalação

  1. Clone o repositório: 

    git clone https://github.com/michellekenia/task-manager
    cd task-management

  2. Instale as dependências:

     npm install

  3. Configure o arquivo .env baseado no .env.example:
    
    cp .env.example .env

# Executando a Aplicação

  npm run start:
