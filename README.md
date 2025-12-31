# 🍽️ Cardápio App – Restaurant Menu Management System

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

Backend completo para gerenciamento de cardápio de restaurantes.
Permite autenticação de usuários, criação de categorias e produtos, upload de imagens e persistência de dados usando **NestJS**, **Prisma** e **PostgreSQL**.

---

## 🚀 Tecnologias

* **NestJS**
* **TypeScript**
* **PostgreSQL**
* **Prisma ORM**
* **JWT (JSON Web Token)**
* **Multer + Sharp (upload e otimização de imagens)**
* **Class-validator**
* **Jest**

---

## 📁 Estrutura do Projeto

```
src/
├── auth/              # Autenticação e JWT
├── common/prisma/     # Prisma Service
├── errors/            # Erros customizados
├── modules/
│   ├── users/         # Usuários
│   ├── category/      # Categorias
│   └── product/       # Produtos
├── app.module.ts
└── main.ts
```

---

## ⬇️ Clonando e Instalando o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Pedrohss2/cardapio-backend.git
```

### 2. Entrar no diretório do projeto

```bash
cd cardapio-backend
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e configure os dados do banco e JWT:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/cardapio_app
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=3600
PORT=3000
```

### 5. Executar migrations no banco

```bash
npx prisma migrate dev
```

### 6. Rodar o projeto em desenvolvimento

```bash
npm run start:dev
```

Após isso, a API estará disponível em `http://localhost:3000`.

---

## 🗄️ Banco de Dados – Diagrama Relacional

```
┌───────────────────┐          ┌──────────────────────────┐          ┌────────────────────┐
│       users       │ 1      N │      user_companies      │ N      1 │     companies      │
├───────────────────┤──────────▶──────────────────────────◀──────────├────────────────────┤
│ PK id             │          │ PK id                    │          │ PK id              │
│ ...               │          │ FK userId                │          │ ...                │
└───────────────────┘          │ FK companyId             │          └───────┬────────────┘
                               └──────────────────────────┘                  │ 1
                                                                             │
                                                                             ▼ N
                               ┌────────────────────┐             ┌───────────────────────┐
                               │     categories     │ 1         N │       products        │
                               ├────────────────────┤─────────────▶───────────────────────┤
                               │ PK id              │             │ PK id                 │
                               │ ...                │             │ FK companyId          │
                               └────────────────────┘             │ FK categoryId         │
                                                                  └───────────────────────┘
```

### 🔗 Relacionamentos

* **User 1 ↔ N UserCompany ↔ 1 Company**: Relação N:N resolvida via tabela pivô para gerenciar permissões.
* **Company 1 → N Product**: Uma empresa possui vários produtos.
* **Category 1 → N Product**: Uma categoria agrupa vários produtos.
* **Product pertence a uma Company e opcionalmente a uma Category**.

---

## 📦 Tabelas do Banco

### 👤 Users (`users`)

| Campo     | Tipo     | Descrição                  |
| --------- | -------- | -------------------------- |
| id        | UUID     | Chave primária             |
| name      | String   | Nome do usuário            |
| email     | String   | Único                      |
| password  | String   | Hash da senha              |
| createdAt | DateTime | Criado automaticamente     |
| updatedAt | DateTime | Atualizado automaticamente |

---

### 🗂️ Categories (`categories`)

| Campo     | Tipo     | Descrição         |
| --------- | -------- | ----------------- |
| id        | UUID     | Chave primária    |
| name      | String   | Nome da categoria |
| createdAt | DateTime | Auto              |
| updatedAt | DateTime | Auto              |

---

### 🍔 Products (`products`)

| Campo       | Tipo     | Descrição           |
| ----------- | -------- | ------------------- |
| id          | UUID     | Chave primária      |
| name        | String   | Nome do produto     |
| price       | Float    | Preço               |
| description | String   | Descrição           |
| image       | String   | URL da imagem       |
| categoryId  | UUID     | FK → categories.id  |
| companyId   | UUID     | FK → companies.id   |
| createdAt   | DateTime | Auto                |
| updatedAt   | DateTime | Auto                |

---

### 🏢 Companies (`companies`)

| Campo     | Tipo     | Descrição           |
| --------- | -------- | ------------------- |
| id        | UUID     | Chave primária      |
| name      | String   | Nome da empresa     |
| address   | String   | Endereço            |
| phone     | String   | Telefone            |
| email     | String   | Email (Único)       |
| createdAt | DateTime | Auto                |
| updatedAt | DateTime | Auto                |

---

### 👥 User Companies (`user_companies`)

| Campo     | Tipo     | Descrição           |
| --------- | -------- | ------------------- |
| id        | UUID     | Chave primária      |
| userId    | UUID     | FK → users.id       |
| companyId | UUID     | FK → companies.id   |
| createdAt | DateTime | Auto                |
| updatedAt | DateTime | Auto                |

---

## 🧬 Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Company {
  id String @id @default(uuid())

  name    String
  address String
  phone   String
  email   String @unique

  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  userCompanies UserCompany[]
  products      Product[]

  @@map("companies")
}

model UserCompany {
  id        String @id @default(uuid())
  userId    String
  companyId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user    User    @relation(fields: [userId], references: [id])
  company Company @relation(fields: [companyId], references: [id])

  @@unique([userId, companyId])
  @@map("user_companies")
}

model User {
  id       String @id @default(uuid())
  name     String
  email    String @unique
  password String

  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  userCompanies UserCompany[]

  @@map("users")
}

model Product {
  id          String  @id @default(uuid())
  name        String
  price       Float
  description String
  image       String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  categoryId String
  companyId  String
  company    Company   @relation(fields: [companyId], references: [id])
  category   Category? @relation(fields: [categoryId], references: [id])

  @@map("products")
}

model Category {
  id   String @id @default(uuid())
  name String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  products Product[]

  @@map("categories")
}
```

---

## 🔐 Autenticação

| Método | Rota           | Descrição           |
| ------ | -------------- | ------------------- |
| POST   | /auth/register | Cadastro de usuário |
| POST   | /auth/login    | Login + JWT         |
| GET    | /auth/profile  | Perfil do usuário   |

---

## 👤 Usuários

| Método | Rota            | Descrição      |
| ------ | --------------- | -------------- |
| POST   | /users/register | Criar usuário  |
| GET    | /users/:id      | Buscar usuário |

---

## 🏢 Empresas (Companies)

| Método | Rota         | Descrição           |
| ------ | ------------ | ------------------- |
| POST   | /company     | Criar empresa       |
| GET    | /company     | Listar empresas     |
| GET    | /company/:id | Buscar empresa      |
| PUT    | /company/:id | Atualizar empresa   |
| DELETE | /company/:id | Remover empresa     |

---

## 👥 Usuário-Empresa (UserCompany)

| Método | Rota                             | Descrição                     |
| ------ | -------------------------------- | ----------------------------- |
| POST   | /user-company                    | Associar usuário à empresa    |
| GET    | /user-company                    | Listar todas as associações   |
| GET    | /user-company/user/:userId       | Listar empresas de um usuário |
| DELETE | /user-company/:userId/:companyId | Remover usuário da empresa    |

---

## 🗂️ Categorias

| Método | Rota          | Descrição           |
| ------ | ------------- | ------------------- |
| POST   | /category     | Criar categoria     |
| GET    | /category     | Listar categorias   |
| GET    | /category/:id | Buscar categoria    |
| PUT    | /category/:id | Atualizar categoria |
| DELETE | /category/:id | Remover categoria   |

---

## 🍕 Produtos

| Método | Rota                  | Descrição              |
| ------ | --------------------- | ---------------------- |
| POST   | /product              | Criar produto + imagem |
| GET    | /product              | Listar produtos        |
| GET    | /product/products/:id | Buscar produto         |
| PUT    | /product/products/:id | Atualizar produto      |
| DELETE | /product/products/:id | Remover produto        |

---

## ⚙️ Variáveis de Ambiente

```env
DATABASE_URL=postgresql://user:password@localhost:5432/cardapio_app
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=3600
PORT=3000
```

---

## ▶️ Rodando o Projeto

```bash
npm install
npx prisma migrate dev
npm run start:dev
```

Após isso, a API estará disponível em `http://localhost:3000`.

---

## 🧪 Testes

```bash
npm run test
npm run test:e2e
npm run test:cov
```

---

## 📄 Licença

MIT License
****
