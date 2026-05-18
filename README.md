# School Library Management API

A production-style RESTful API for managing a school library  built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. Designed to be clean, modular, and beginner-to-intermediate friendly.

---

## Features

- Full CRUD for Authors, Books, and Students
- Book borrowing and returning with full transaction history
- JWT-based authentication for library attendants
- Overdue tracking via BorrowTransaction status
- Paginated list endpoints with search and filtering
- Centralized error handling
- Swagger/OpenAPI documentation at `/api-docs`
- Database seeding with realistic data

---

## Project Structure

```
/library-mgt-system
├── config/         # DB connection, Swagger config
├── controllers/    # Thin controllers (glue layer)
├── middleware/     # Auth, validation, error handler
├── models/         # Mongoose models
├── routes/         # Express routes with Swagger JSDoc
├── services/       # Business logic lives here
├── utils/          # asyncHandler, pagination, apiResponse
├── seed/           # Seed scripts and data
├── app.js          # Express app setup
└── server.js       # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
git clone `library-mgt-system`
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable        | Description                      | Example                                  |
|-----------------|----------------------------------|------------------------------------------|
| `PORT`          | Server port                      | `5000`                                   |
| `MONGO_URI`     | MongoDB connection string        | `mongodb://localhost:27017/library-system` |
| `JWT_SECRET`    | Secret key for signing JWTs      | `any_long_random_string`                 |
| `JWT_EXPIRES_IN`| JWT expiry duration              | `7d`                                     |

### Run Locally

```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

The server starts at: `http://localhost:5000`

---

## Seed the Database

Populate the database with sample authors, books, students, and attendants:

```bash
npm run seed
```

This will print login credentials for the seeded attendants.

---

## API Documentation

Once the server is running, open Swagger UI:

```
http://localhost:5000/api-docs
```

All endpoints are documented with request/response examples.

---

## Authentication

This API uses **JWT Bearer tokens**.

### 1. Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "blessing.okeke@library.edu.ng",
  "password": "password123"
}
```

### 2. Use the token

Include the token in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_token_here>
```

### Protected Routes

| Method | Route                  | Auth Required |
|--------|------------------------|---------------|
| POST   | /api/books             | ✅            |
| PUT    | /api/books/:id         | ✅            |
| DELETE | /api/books/:id         | ✅            |
| POST   | /api/books/:id/borrow  | ✅            |
| POST   | /api/books/:id/return  | ✅            |
| POST   | /api/attendants        | ✅            |
| GET    | /api/attendants        | ✅            |
| POST   | /api/authors           | ✅            |
| PUT    | /api/authors/:id       | ✅            |
| DELETE | /api/authors/:id       | ✅            |

---

## Example Requests

### Get all books (with filters)

```http
GET /api/books?page=1&limit=10&title=things&status=IN
```

### Borrow a book

```http
POST /api/books/64abc.../borrow
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentId": "64def...",
  "attendantId": "64ghi...",
  "returnDate": "2026-06-15"
}
```

### Return a book

```http
POST /api/books/64abc.../return
Authorization: Bearer <token>
```

---

## Response Format

All responses follow this consistent envelope:

**Success:**
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Book is already borrowed and not available"
}
```

---

## Tech Stack

| Package            | Purpose                        |
|--------------------|--------------------------------|
| express            | Web framework                  |
| mongoose           | MongoDB ODM                    |
| bcryptjs           | Password hashing               |
| jsonwebtoken       | JWT auth                       |
| swagger-ui-express | API documentation UI           |
| swagger-jsdoc      | Generate OpenAPI spec from JSDoc |
| morgan             | HTTP request logging           |
| cors               | Cross-origin resource sharing  |
| dotenv             | Environment variable loading   |
| nodemon            | Dev auto-restart               |

---

## Architecture Decisions

- **Services layer**: All business logic lives in `/services`. Controllers stay thin.
- **asyncHandler**: Eliminates repetitive try/catch blocks in every controller.
- **Separate BorrowTransaction model**: Borrowing history is never overwritten. Each transaction is a permanent record.
- **Centralized error handler**: One place to handle all errors — Mongoose, JWT, custom, and unexpected.
- **Reusable pagination utility**: Consistent pagination across all list endpoints.
