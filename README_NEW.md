# Cardapio App - Restaurant Menu Management System

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

## Description

Cardapio App is a comprehensive restaurant menu management system built with [NestJS](https://nestjs.com/), a progressive Node.js framework. This application allows restaurants to manage their menu items, categories, and user authentication.

## Features

- **Product Management**: Create, read, update, and delete menu items with image upload support
- **Category Management**: Organize menu items into categories
- **User Authentication**: Secure user registration and login with JWT tokens
- **RESTful API**: Well-structured API endpoints for all functionalities
- **Database Integration**: Prisma ORM for efficient database operations
- **File Upload**: Support for product image uploads

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer with Sharp for image processing
- **Validation**: Class-validator
- **Testing**: Jest

## Project Structure

```
src/
├── auth/              # Authentication module
├── common/prisma/     # Prisma service
├── errors/            # Custom error handling
├── modules/
│   ├── category/      # Category management
│   ├── product/       # Product management
│   └── users/         # User management
├── app.module.ts      # Main application module
└── main.ts            # Application entry point
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile (requires authentication)

### Users
- `POST /users/register` - Register a new user
- `GET /users/:id` - Get user by ID

### Categories
- `POST /category` - Create a new category (requires authentication)
- `GET /category` - Get all categories
- `GET /category/:id` - Get category by ID (requires authentication)
- `PUT /category/:id` - Update category by ID (requires authentication)
- `DELETE /category/:id` - Delete category by ID (requires authentication)

### Products
- `POST /product` - Create a new product with image upload
- `GET /product` - Get all products
- `GET /product/products/:id` - Get product by ID
- `PUT /product/products/:id` - Update product by ID with image upload
- `DELETE /product/products/:id` - Delete product by ID

## Project Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- PostgreSQL database

### Installation

```bash
# Clone the repository
$ git clone <repository-url>

# Navigate to the project directory
$ cd cardapio-app

# Install dependencies
$ npm install
```

### Database Setup

1. Create a PostgreSQL database for the application
2. Copy `.env.example` to `.env` and configure your database connection:

```
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
JWT_SECRET="your_jwt_secret_key"
```

3. Run database migrations:

```bash
$ npx prisma migrate dev
```

### Running the Application

```bash
# Development mode
$ npm run start:dev

# Production mode
$ npm run start:prod

# Build the application
$ npm run build
```

### Running Tests

```bash
# Unit tests
$ npm run test

# End-to-end tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/cardapio_app?schema=public

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=3600

# Server
PORT=3000
```

## Deployment

To deploy this application to production:

1. Set up your production database
2. Configure environment variables for production
3. Build the application:

```bash
$ npm run build
```

4. Start the production server:

```bash
$ npm run start:prod
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [NestJS](https://nestjs.com/) for the amazing framework
- [Prisma](https://www.prisma.io/) for the ORM
- All contributors to this project