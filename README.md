# 📦 Ecommerce Backend

Este projeto é um **backend para um sistema de e-commerce**, desenvolvido com **NestJS + TypeScript**, utilizando **Prisma ORM** para banco de dados e suporte a **autenticação JWT**. Também possui configuração com **Docker** para facilitar o deploy.

---

## 🚀 Como iniciar o projeto

### ✅ Pré-requisitos

- Node.js (>= 18)
- npm ou yarn
- Docker (opcional, mas recomendado)

### 🔧 Instalação local (sem Docker)

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cd ecommerce-backend

# Edite o arquivo .env com as credenciais do banco
DATABASE_URL=postgresql://postgres:postgres@db:5432/ecommerce
BCRYPT_SALT_ROUNDS=12

# Rodar as migration prisma
npm run migrate:docker= --name=role_enum_user

# Rodar prisma studio
npm run studio:prisma
```

A aplicação ficará disponível em `http://localhost:3000`.

### 🐳 Rodando com Docker

```bash
# Subir containers (banco + app)
npm run start:docker
```

---

## 📂 Estrutura do projeto

```
src/
 ├── main.ts                # Ponto de entrada da aplicação
 ├── core/
 │   ├── auth/              # Autenticação e autorização
 │   │   ├── controllers/   # AuthController (login, registro, tokens...)
 │   │   ├── dtos/          # Data Transfer Objects (login, register, etc)
 │   │   ├── repositories/  # Repositórios de acesso a dados de usuário
 │   │   └── domain/        # Entidades, use-cases e roles
 │   ├── products/          # CRUD de produtos
 │   │   ├── controllers/   # ProductController
 │   │   ├── dtos/          # DTOs de produto
 │   │   ├── repositories/  # Repositório de produtos
 │   │   └── use-cases/     # Casos de uso (criar, editar, deletar...)
 │   ├── categories/        # CRUD de categorias de produtos
 │   ├── users/             # Rotas de perfil de usuário
 │   └── admin/             # Funções administrativas (gerenciar usuários)
 └── shared/                # Configurações e tipos compartilhados
```

---

## 📌 Documentação das Rotas

### 🔑 Auth (`/auth`)

| Método | Rota                           | Descrição                        | Body (JSON)                 |
| ------ | ------------------------------ | -------------------------------- | --------------------------- |
| POST   | `/auth/register`               | Registrar novo usuário           | `{ email, password, name }` |
| POST   | `/auth/login`                  | Login e receber access + refresh | `{ email, password }`       |
| POST   | `/auth/refresh-token`          | Renovar access token             | `{ refreshToken }`          |
| POST   | `/auth/request-password-reset` | Solicitar recuperação de senha   | `{ email }`                 |
| POST   | `/auth/reset-password`         | Redefinir senha                  | `{ token, newPassword }`    |
| DELETE | `/auth/delete-account`         | Deletar a própria conta          | *Header: Bearer Token*      |

---

### 🛍️ Products (`/products`)

| Método | Rota            | Descrição                     | Body (JSON)                                      |
| ------ | --------------- | ----------------------------- | ------------------------------------------------ |
| GET    | `/products`     | Listar produtos (com filtros) | Query params: `minPrice`, `maxPrice`, `category` |
| GET    | `/products/:id` | Obter produto pelo ID         | -                                                |
| POST   | `/products`     | Criar produto (admin/seller)  | `{ name, price, description, categoryId }`       |
| PUT    | `/products/:id` | Atualizar produto             | `{ name?, price?, description?, categoryId? }`   |
| DELETE | `/products/:id` | Deletar produto               | -                                                |

---

### 📂 Categories (`/categories`)

| Método | Rota              | Descrição              | Body (JSON) |
| ------ | ----------------- | ---------------------- | ----------- |
| GET    | `/categories`     | Listar categorias      | -           |
| GET    | `/categories/:id` | Obter categoria por ID | -           |
| POST   | `/categories`     | Criar categoria        | `{ name }`  |
| PUT    | `/categories/:id` | Atualizar categoria    | `{ name }`  |
| DELETE | `/categories/:id` | Deletar categoria      | -           |

---

### 👤 Users (`/users`)

| Método | Rota         | Descrição              | Body |
| ------ | ------------ | ---------------------- | ---- |
| GET    | `/users/:id` | Obter dados de usuário | -    |

---

### 🛠️ Admin (`/admin`)

| Método | Rota               | Descrição                       | Body (JSON)        |
| ------ | ------------------ | ------------------------------- | ------------------ |
| GET    | `/admin/users`     | Listar todos os usuários        | -                  |
| POST   | `/admin/promote`   | Promover usuário a admin/seller | `{ userId, role }` |
| DELETE | `/admin/users/:id` | Deletar usuário                 | -                  |

---

## ⚙️ Tecnologias utilizadas

- **NestJS** (framework Node.js)
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL** (default no docker-compose)
- **JWT** para autenticação
- **Docker + Docker Compose**

---

## 📌 Próximos passos / melhorias sugeridas

- Adicionar documentação automática com Swagger
- Implementar testes unitários e de integração
- Criar CI/CD para deploy automático

---

👨‍💻 Desenvolvido para estudos de arquitetura limpa em NestJS + Prisma

