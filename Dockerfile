FROM node:18

WORKDIR /app

# Copia os arquivos de configuração primeiro
COPY package.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./

# Instala as dependências
RUN npm install

# Copia a pasta prisma e src (garantindo que existam)
COPY prisma ./prisma/
COPY src ./src/

# Gera o motor do banco e faz o build
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
