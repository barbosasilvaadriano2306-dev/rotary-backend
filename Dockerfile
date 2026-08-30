FROM node:18-slim
RUN apt-get update && apt-get install -y openssl libssl-dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npx tsc
EXPOSE 3000
# Comando direto e simples
CMD npx prisma db push && node dist/main.js
