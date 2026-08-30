FROM node:18-slim

# Instala o motor de segurança
RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /app

# Copia dependências
COPY package*.json ./
RUN npm install

# Copia o projeto
COPY . .

# Gera o motor do Banco de Dados
RUN npx prisma generate

# Constrói o sistema
RUN npm run build

# Abre a porta
EXPOSE 3000

# O SEGREDO: Antes de ligar, ele cria as tabelas no Elefante Azul
# E depois tenta ligar o app no caminho gerado pelo NestJS
CMD npx prisma db push && node dist/src/main.js
