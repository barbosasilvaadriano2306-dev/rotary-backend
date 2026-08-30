FROM node:18-slim

# Passo A: Instala o motor de segurança que o Prisma exige
RUN apt-get update && apt-get install -y openssl libssl-dev

# Passo B: Define a pasta de trabalho
WORKDIR /app

# Passo C: Copia os arquivos de dependências
COPY package*.json ./

# Passo D: Instala os programas (NestJS, Prisma, etc)
RUN npm install

# Passo E: Copia TODOS os arquivos do projeto (incluindo a pasta prisma)
COPY . .

# Passo F: Gera o motor do Banco de Dados
RUN npx prisma generate

# Passo G: Constrói o sistema
RUN npm run build

# Passo H: Informa a porta de comunicação
EXPOSE 3000

# Passo I: Comando para ligar o servidor
CMD ["node", "dist/src/main.js"]
