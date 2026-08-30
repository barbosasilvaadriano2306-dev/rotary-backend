FROM node:18

WORKDIR /app

# Copia as configurações
COPY package*.json ./

# Instala tudo
RUN npm install

# Copia o resto (incluindo a pasta prisma que você criou no passo 1)
COPY . .

# Gera o banco apontando para o arquivo certo
RUN npx prisma generate --schema=./prisma/schema.prisma

# Faz o build
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
