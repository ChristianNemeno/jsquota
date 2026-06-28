# Quotes Database Schema

This document outlines the database schema for the Quotes system, based on the provided entity-relationship diagram.

## Entity Relationship Diagram

```mermaid
erDiagram
    Author {
        string id PK
        string name
        string email UK "unique"
        string bio "optional"
        datetime createdAt
        datetime updatedAt
    }
    
    Quote {
        string id PK
        string text
        string authorId FK
        string categoryId FK
        datetime createdAt
        datetime updatedAt
    }
    
    Category {
        string id PK
        string name UK "unique"
        string description
        datetime createdAt
        datetime updatedAt
    }
    
    Tag {
        string id PK
        string name UK "unique"
        datetime createdAt
        datetime updatedAt
    }
    
    Quote_Tag {
        string quoteId PK,FK
        string tagId PK,FK
    }

    Author ||--o{ Quote : "writes"
    Category ||--o{ Quote : "categorizes"
    Quote ||--o{ Quote_Tag : "has"
    Tag ||--o{ Quote_Tag : "assigned to"
```

## Table Definitions

### Author
| Column | Constraints | Notes |
| :--- | :--- | :--- |
| `id` | Primary Key | |
| `name` | | |
| `email` | Unique | |
| `bio` | Optional | |
| `createdAt` | | |
| `updatedAt` | | |

### Quote
| Column | Constraints | Notes |
| :--- | :--- | :--- |
| `id` | Primary Key | |
| `text` | | |
| `authorId` | Foreign Key | References `Author.id` |
| `categoryId` | Foreign Key | References `Category.id` |
| `createdAt` | | |
| `updatedAt` | | |

### Category
| Column | Constraints | Notes |
| :--- | :--- | :--- |
| `id` | Primary Key | |
| `name` | Unique | |
| `description` | | |
| `createdAt` | | |
| `updatedAt` | | |

### Tag
| Column | Constraints | Notes |
| :--- | :--- | :--- |
| `id` | Primary Key | |
| `name` | Unique | |
| `createdAt` | | |
| `updatedAt` | | |

### Quote_Tag (Join Table)
| Column | Constraints | Notes |
| :--- | :--- | :--- |
| `quoteId` | Primary Key, Foreign Key | References `Quote.id` |
| `tagId` | Primary Key, Foreign Key | References `Tag.id` |

---

## Implementation Backlog

| # | Task | Depends on |
|---|------|------------|
| 0 | Monorepo restructuring (Phase 0) | — |
| 1 | Author module (CRUD + `GET /authors/:id/quotes`) | 0 |
| 2 | Category module (CRUD + `GET /categories/:id/quotes`) | 0 |
| 3 | Tag module (CRUD + `GET /tags/:id/quotes`) | 0 |
| 4 | Quote module (CRUD + relationships) | 1, 2, 3 |
| 5 | Swagger docs on all endpoints | 4 |
| 6 | README submission | 5 |
