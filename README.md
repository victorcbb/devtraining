# 🚀 DevTraining 2023 - NestJS com TypeORM e PostgreSQL

## 📋 Descrição

Esta aplicação é um caso de estudo desenvolvido para demonstrar os princípios básicos do **NestJS** e sua integração com **TypeORM** e **PostgreSQL**. O projeto implementa um sistema de gerenciamento de cursos com tags, servindo como exemplo prático para aprender as funcionalidades fundamentais do framework.

## 🎯 Objetivos de Aprendizado

- **Conhecer os principais recursos do framework NestJS** para criação de aplicativos com Node.js
- **Integrar o TypeORM ao NestJS** aplicado com o banco de dados PostgreSQL
- Aplicar conceitos de arquitetura modular e injeção de dependências
- Implementar operações CRUD com validação de dados
- Trabalhar com relacionamentos entre entidades (Many-to-Many)

## 🏗️ Arquitetura da Aplicação

### Estrutura do Projeto

```
src/
├── app.module.ts              # Módulo principal da aplicação
├── main.ts                    # Ponto de entrada da aplicação
├── courses/                   # Módulo de cursos
│   ├── courses.controller.ts  # Controlador REST
│   ├── courses.service.ts     # Lógica de negócio
│   ├── courses.module.ts      # Configuração do módulo
│   ├── dto/                   # Data Transfer Objects
│   └── entities/              # Entidades TypeORM
├── database/                  # Configuração do banco de dados
│   └── database.module.ts     # Módulo de configuração TypeORM
└── migrations/                # Migrações do banco de dados
```

### Tecnologias Utilizadas

- **Framework**: NestJS 10.x
- **ORM**: TypeORM 0.3.x
- **Banco de Dados**: PostgreSQL
- **Validação**: class-validator + class-transformer
- **Testes**: Jest
- **Containerização**: Docker + Docker Compose

## 🚀 Funcionalidades

### API de Cursos

- ✅ **GET** `/courses` - Listar todos os cursos
- ✅ **GET** `/courses/:id` - Buscar curso por ID
- ✅ **POST** `/courses` - Criar novo curso
- ✅ **PUT** `/courses/:id` - Atualizar curso existente
- ✅ **DELETE** `/courses/:id` - Remover curso

### Entidades

- **Course**: Nome, descrição, tags e data de criação
- **Tag**: Sistema de categorização para cursos
- **Relacionamento**: Many-to-Many entre cursos e tags

## 🛠️ Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- pnpm (recomendado) ou npm

## 📦 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <repository-url>
cd devtraining-2023
```

### 2. Instale as dependências

```bash
pnpm install
# ou
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=docker
DB_NAME=devtraining

# Configurações da Aplicação
PORT=3000
NODE_ENV=development
```

### 4. Inicie o banco de dados com Docker

```bash
docker-compose up -d
```

### 5. Execute as migrações

```bash
pnpm run typeorm migration:run
# ou
npm run typeorm migration:run
```

### 6. Inicie a aplicação

```bash
# Desenvolvimento (com hot-reload)
pnpm run start:dev

# Produção
pnpm run build
pnpm run start:prod
```

## 🐳 Docker

### Estrutura dos Containers

- **devtraining-db**: Banco PostgreSQL principal (porta 5432)
- **test-db**: Banco PostgreSQL para testes (porta 5433)

### Comandos Docker

```bash
# Iniciar todos os serviços
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Visualizar logs
docker-compose logs -f db

# Reconstruir containers
docker-compose up --build
```

## 📜 Scripts Disponíveis

### Desenvolvimento

```bash
pnpm run start:dev      # Inicia em modo desenvolvimento com hot-reload
```

### Produção

```bash
pnpm run build          # Compila o projeto
pnpm run start:prod     # Inicia a versão compilada
```

### Testes

```bash
pnpm run test           # Executa testes unitários
pnpm run test:watch     # Executa testes em modo watch
pnpm run test:cov       # Executa testes com cobertura
pnpm run test:e2e       # Executa testes end-to-end
```

### Qualidade de Código

```bash
pnpm run lint           # Executa ESLint
pnpm run format         # Formata código com Prettier
```

## 🧪 Endpoints da API

| Método     | Endpoint       | Descrição                     | Body (JSON)                                                                 |
| ---------- | -------------- | ----------------------------- | --------------------------------------------------------------------------- |
| **GET**    | `/`            | Verificar status da aplicação | -                                                                           |
| **GET**    | `/courses`     | Listar todos os cursos        | -                                                                           |
| **GET**    | `/courses/:id` | Buscar curso por ID           | -                                                                           |
| **POST**   | `/courses`     | Criar novo curso              | `{"name": "string", "description": "string", "tags": [{"name": "string"}]}` |
| **PUT**    | `/courses/:id` | Atualizar curso existente     | `{"name": "string", "description": "string", "tags": [{"name": "string"}]}` |
| **DELETE** | `/courses/:id` | Remover curso                 | -                                                                           |

## 🔧 Configurações Adicionais

### TypeORM CLI

O projeto inclui configuração para TypeORM CLI em `orm-cli-config.ts` para execução de migrações e seeds.

### Validação Global

A aplicação utiliza `ValidationPipe` global para validação automática de DTOs com:

- `whitelist: true` - Remove propriedades não declaradas
- `forbidNonWhitelisted: true` - Rejeita requisições com propriedades inválidas
- `transform: true` - Converte tipos automaticamente

## 📚 Conceitos Demonstrados

### NestJS

- **Módulos**: Organização modular da aplicação
- **Controllers**: Endpoints REST com decorators
- **Services**: Lógica de negócio e injeção de dependências
- **Pipes**: Validação e transformação de dados
- **ConfigModule**: Gerenciamento de configurações

### TypeORM

- **Entities**: Definição de modelos com decorators
- **Relationships**: Relacionamentos Many-to-Many
- **Migrations**: Controle de versão do banco de dados
- **Repository Pattern**: Acesso aos dados

## 🚨 Solução de Problemas

### Erro de Conexão com Banco

```bash
# Verificar se o container está rodando
docker ps

# Verificar logs do banco
docker-compose logs db

# Reiniciar o container
docker-compose restart db
```

### Porta já em uso

```bash
# Verificar processos na porta 3000
lsof -i :3000

# Matar processo específico
kill -9 <PID>
```

## 📖 Recursos de Aprendizado

- [Documentação oficial do NestJS](https://docs.nestjs.com/)
- [Documentação do TypeORM](https://typeorm.io/)
- [Guia de PostgreSQL](https://www.postgresql.org/docs/)

---

## 🎓 Informações do Curso

**Nome do Curso**: **NestJS do Zero com TypeORM, Mongoose, Prisma e Swagger**

**Professor**: **Jorge Aluizio Alves Souza**

**Plataforma**: **Udemy**

---

## 📄 Licença

Este projeto é parte de um curso educacional e está disponível para fins de estudo e aprendizado.

## 🤝 Contribuição

Este é um projeto de estudo. Para contribuições ou dúvidas sobre o curso, entre em contato através da plataforma Udemy.
