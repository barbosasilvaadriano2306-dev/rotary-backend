FROM node:18-slim
RUN apt-get update && apt-get install -y openssl libssl-dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
# Sincroniza o banco e inicia o arquivo principal na pasta dist
CMD npx prisma db push && node dist/src/main.js
