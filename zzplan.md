# ✅ NestJS Exercise Goals: Quote Management REST API

This checklist outlines the deliverables for the NestJS hands-on exercise. Please read carefully and ensure all parts are completed.

---

# 📦 Project Setup

* NestJS project should be initialized and connected to **MySQL**.
* Include a **.env** file upon submission.
* Use **TypeORM** or **Prisma** for database access.
* Prefer a **code-first approach** — models/entities should be defined in code, and schema changes should be handled through migrations rather than manual SQL.
* Organize the application following **NestJS modular architecture**.

---

# 👤 Author Module

Create an **Author** model with the following fields:

* `id` — auto-increment primary key
* `name` — string (required)
* `email` — string (required, unique, valid email format)
* `bio` — string (optional)

The **Author** module should support full CRUD operations.

Additionally, since an author can have multiple quotes, provide an endpoint to retrieve all quotes written by a specific author.

```
GET /authors/:id/quotes
```

---

# 💬 Quote Module

Create a **Quote** model with the following fields:

* `id` — auto-increment primary key
* `text` — string (required)
* `authorId` — number (required, references an existing Author)
* `categoryId` — number (required, references an existing Category)

The **Quote** module should support full CRUD operations.

Each quote must belong to an existing author and category (enforced through foreign keys).

A quote may also contain multiple tags.

---

# 📂 Category Module

Create a **Category** model with the following fields:

* `id` — auto-increment primary key
* `name` — string (required, unique)
* `description` — string (optional)

The **Category** module should support full CRUD operations.

Provide an endpoint to retrieve all quotes under a specific category.

```
GET /categories/:id/quotes
```

---

# 🏷️ Tag Module

Create a **Tag** model with the following fields:

* `id` — auto-increment primary key
* `name` — string (required, unique)

The **Tag** module should support full CRUD operations.

A tag may belong to multiple quotes, and a quote may contain multiple tags (Many-to-Many relationship).

Provide an endpoint to retrieve all quotes associated with a specific tag.

```
GET /tags/:id/quotes
```

---

# 🔗 Relationships

Implement the following relationships:

* One Author → Many Quotes
* One Category → Many Quotes
* Many Quotes ↔ Many Tags

Use proper foreign keys and relationship decorators provided by your chosen ORM.

---

# 🧪 API Testing

Swagger UI should be available at:

```
/api
```

All routes and DTOs must be documented using `@nestjs/swagger`.

Demonstrate the API using Swagger by providing:

* Sample POST requests
* Sample GET requests
* Sample PUT/PATCH requests
* Sample DELETE requests
* At least one sample cURL request

---

# 🧹 Code Quality

Follow NestJS best practices.

* Use proper modular folder structure:

  * `authors/`
  * `quotes/`
  * `categories/`
  * `tags/`
* Keep controller and service layers separate.
* Apply validation using DTOs in all route handlers.
* Handle errors gracefully.
* Use dependency injection appropriately.
* Follow clean and consistent coding practices.

---

# 📁 Submission Checklist

## ✅ 1. README.md

Include:

* Project title
* Project description
* Setup and installation instructions
* Environment variable configuration
* Database migration steps
* Swagger URL
* API overview
* Any assumptions, notes, or disclaimers

---

## ✅ 2. Source Code

Include:

* Complete NestJS project
* `.env` file
* Migration files
* Well-organized modules
* Entity definitions
* DTOs
* Controllers
* Services

---

# 🔚 Final Note

Your goal is to build a fully functional Quote Management REST API.

The API should:

* Store and retrieve data from a MySQL database.
* Follow a code-first approach using TypeORM or Prisma.
* Implement proper entity relationships.
* Expose complete CRUD endpoints.
* Validate incoming requests using DTOs.
* Be fully documented using Swagger.
* Follow NestJS modular architecture and best practices.

The finished project should demonstrate the implementation of One-to-Many and Many-to-Many relationships, proper RESTful API design, and clean application structure using NestJS.
