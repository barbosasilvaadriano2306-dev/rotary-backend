FROM node:18

WORKDIR /app

# Copia os arquivos de configuração
COPY package*.json ./
COPY prisma ./prisma/

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Gera o cliente do Prisma e faz o build do NestJS
RUN npx prisma generate
RUN npm run build

# Porta que o Railway usa
EXPOSE 3000

# Comando para rodar o app
CMD ["npm", "run", "start:prod"]
