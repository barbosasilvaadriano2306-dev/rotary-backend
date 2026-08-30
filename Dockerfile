FROM node:18

# Define a pasta de trabalho
WORKDIR /app

# Copia TODOS os arquivos do GitHub para dentro do servidor de uma vez
COPY . .

# Instala as dependências
RUN npm install

# Gera o cliente do banco de dados
RUN npx prisma generate

# Constrói o sistema (O passo que estava dando erro)
RUN npm run build

# Porta de comunicação
EXPOSE 3000

# Comando para ligar
CMD ["npm", "run", "start:prod"]
