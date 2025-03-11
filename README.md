# Product Management API with GraphQL

This is a **NestJS** application that provides a **GraphQL-based API** for managing products and categories using **MySQL** and **TypeORM**.

## Features

- **GraphQL API** for querying and mutating data
- **MySQL database** integration with **TypeORM**
- **CRUD operations** for products and categories
- **Entity relationships** between products and categories
- **Resolvers** to handle GraphQL queries and mutations

## Installation

### Prerequisites

- **Node.js** (>=16.x)
- **MySQL** (installed and running)
- **NestJS CLI** (optional, for development)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/nghiemledo/nestjs-product-management.git
   cd nestjs-product-management
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Configure the database connection in `.env`:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=password
   DB_NAME=product_db
   ```
4. Run the database migrations:
   ```sh
   yarn run migration:run
   ```
5. Start the application:
   ```sh
   yarn start
   ```
6. Open GraphQL Playground at:
   ```
   http://localhost:3000/graphql
   ```

## Database Schema

### Product Entity

| Field       | Type   |
| ----------- | ------ |
| id          | ID     |
| name        | String |
| price       | Float  |
| description | String |
| categoryId  | ID     |

### Category Entity

| Field | Type   |
| ----- | ------ |
| id    | ID     |
| name  | String |

## GraphQL API

### Queries

| Query               | Description        |
| ------------------- | ------------------ |
| `products`          | Get all products   |
| `product(id: ID!)`  | Get product by ID  |
| `categories`        | Get all categories |
| `category(id: ID!)` | Get category by ID |

### Mutations

| Mutation                                               | Description                |
| ------------------------------------------------------ | -------------------------- |
| `createProduct(input: CreateProductInput!)`            | Add a new product          |
| `updateProduct(id: ID!, input: UpdateProductInput!)`   | Update an existing product |
| `deleteProduct(id: ID!)`                               | Delete a product           |
| `createCategory(input: CreateCategoryInput!)`          | Add a new category         |
| `updateCategory(id: ID!, input: UpdateCategoryInput!)` | Update a category          |
| `deleteCategory(id: ID!)`                              | Delete a category          |

## Entity Relationships

- Each **Product** belongs to **one Category** (via `categoryId`).
- Each **Category** can have multiple **Products**.
- GraphQL **resolvers** return category details for each product.

## Development

- Run in watch mode: `yarn start:dev`
- Run tests: `yarn run test`
- Build for production: `yarn run build`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
