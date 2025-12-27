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
┌───────────────────┐          ┌────────────────────┐
│       users       │          │     categories     │
├───────────────────┤          ├────────────────────┤
│ PK id (uuid)      │          │ PK id (uuid)       │
│ name              │          │ name               │
│ email (unique)    │          │ createdAt          │
│ password          │          │ updatedAt          │
│ createdAt         │          └─────────┬──────────┘
│ updatedAt         │                    │ 1
└───────────────────┘                    │
                                         │
                                         ▼
                               ┌────────────────────────┐
                               │        products        │
                               ├────────────────────────┤
                               │ PK id (uuid)           │
                               │ name                   │
                               │ price                  │
                               │ description            │
                               │ image (nullable)       │
                               │ FK categoryId (uuid)   │
                               │ createdAt              │
                               │ updatedAt              │
                               └────────────────────────┘
```

### 🔗 Relacionamentos

* **Category 1 → N Product**
* **Product pertence opcionalmente a uma Category**

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

| Campo       | Tipo     | Descrição          |
| ----------- | -------- | ------------------ |
| id          | UUID     | Chave primária     |
| name        | String   | Nome do produto    |
| price       | Float    | Preço              |
| description | String   | Descrição          |
| image       | String   | URL da imagem      |
| categoryId  | UUID     | FK → categories.id |
| createdAt   | DateTime | Auto               |
| updatedAt   | DateTime | Auto               |

---

## 🧬 Prisma Schema

```prisma

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Category {
  id        String    @id @default(uuid())
  name      String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  products  Product[]

  @@map("categories")
}

model Product {
  id          String    @id @default(uuid())
  name        String
  price       Float
  description String
  image       String?

  categoryId  String?
  category    Category? @relation(fields: [categoryId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("products")
}
```

---

## 🔐 Autenticação

| Método | Rota           | Descrição           | Auth |
| ------ | -------------- | ------------------- | ---- |
| POST   | /auth/register | Cadastro de usuário | ❌    |
| POST   | /auth/login    | Login + JWT         | ❌    |
| GET    | /auth/profile  | Perfil do usuário   | ✅    |

---

## 👤 Usuários

| Método | Rota            | Descrição      | Auth |
| ------ | --------------- | -------------- | ---- |
| POST   | /users/register | Criar usuário  | ❌    |
| GET    | /users/:id      | Buscar usuário | ✅    |

---

## 🗂️ Categorias

| Método | Rota          | Descrição           | Auth |
| ------ | ------------- | ------------------- | ---- |
| POST   | /category     | Criar categoria     | ✅    |
| GET    | /category     | Listar categorias   | ❌    |
| GET    | /category/:id | Buscar categoria    | ✅    |
| PUT    | /category/:id | Atualizar categoria | ✅    |
| DELETE | /category/:id | Remover categoria   | ✅    |

---

## 🍕 Produtos

| Método | Rota                  | Descrição              | Auth |
| ------ | --------------------- | ---------------------- | ---- |
| POST   | /product              | Criar produto + imagem | ✅    |
| GET    | /product              | Listar produtos        | ❌    |
| GET    | /product/products/:id | Buscar produto         | ❌    |
| PUT    | /product/products/:id | Atualizar produto      | ✅    |
| DELETE | /product/products/:id | Remover produto        | ✅    |

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
