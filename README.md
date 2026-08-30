# Rotary Backend (NestJS + Prisma)

Minimal NestJS backend for a Rotary Club MVP using Prisma and PostgreSQL.

Stack
- NestJS
- Prisma (PostgreSQL)
- Docker

Prerequisites
- Node 18+
- npm
- PostgreSQL (or use Railway Postgres)
- (Recommended) Docker

Quick start (local)
1. Clone the repo
2. Create a `.env` file with:
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
   PORT=3000 (optional)
3. Install dependencies:
   npm install
   (postinstall runs `prisma generate` automatically)
4. Generate Prisma client (if needed):
   npx prisma generate
5. Push schema or run migrations:
   - Quick sync: npx prisma db push
   - With migrations: npx prisma migrate dev --name init
6. Run:
   npm run build
   npm run start:prod
   or for development:
   npm run start

Docker
- Build: docker build -t rotary-backend .
- Run: docker run -e DATABASE_URL="postgresql://..." -p 3000:3000 rotary-backend

Railway deployment notes
- Provision a PostgreSQL database or add the Railway Postgres plugin and set DATABASE_URL in Railway environment variables.
- Railway sets PORT automatically; the app listens on process.env.PORT || 3000.
- You can deploy via Docker (Dockerfile included) or use Railway’s Node deployment (package.json includes postinstall: prisma generate).
