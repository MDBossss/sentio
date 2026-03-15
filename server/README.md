# Backend App

Express.js backend for Sentio apps with TypeScript, Prisma ORM, and MySQL.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Update the `DATABASE_URL` in `.env` with your MySQL connection string.

4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

5. Run migrations:
   ```bash
   npm run prisma:migrate
   ```

## Development

Start the development server:
```bash
npm run dev
```

The server will be running on `http://localhost:3000` by default.

## Available Endpoints

- `GET /hello` - Returns "Hello World"
- `GET /health` - Health check endpoint

## Building

Build the TypeScript code:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Database

View and manage your database:
```bash
npm run prisma:studio
```

## Adding Models

Edit `prisma/schema.prisma` to define your models, then run:
```bash
npm run prisma:migrate
```
