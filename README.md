# Netapp Backend Challenge

This is an API that allows you to create, read, update and delete users and has an authentication feature.

This is part of the Netapp Frontend Challenge.

## Built With

- [Bun](https://bun.dev/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Railway](https://railway.app/)
- [Neon](https://neon.tech)

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

- Bun
- PostgreSQL
- Docker(optional)

### Installation

1. Clone the repo, or download the zip file

   ```bash
   git@github.com:Camilo-J/netapp-backend-challenge.git
    ```

2. Install NPM packages

   ```bash
   bun install
    ```

3. Run the app
   
   ```bash
   bun run dev
    ```
4. Open your browser and go to `http://localhost:3001/api/v1`
   
5. You can also test the API using Insomnia or any other API testing tool

## Usage

The API has the following routes (you can use the included Insomnia workspace to test the API):

- `GET /users` - Get all users
- `GET /users/:id` - Get a user by id
- `POST /users` - Create a user
- `PATCH /users/:id` - Update a user by id
- `DELETE /users/:id` - Delete a user by id
- `POST /login` - Login a user
- `POST /signup` - Register a user
- `DELETE /logout` - Logout a user
- `POST /token` - Refresh a token
- `POST /change-password` - Change a user's password


