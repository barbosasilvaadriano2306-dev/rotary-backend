FROM node:18

WORKDIR /app

# 1. Copia apenas os arquivos de dependências primeiro
COPY package*.json ./

# 2. Instala os programas necessários
RUN npm install

# 3. Copia TODO o resto dos arquivos do projeto de uma vez
# Isso evita o erro de "pasta não encontrada"
COPY . .

# 4. Gera o motor do Banco de Dados
# O Prisma vai procurar o arquivo schema.prisma sozinho agora
RUN npx prisma generate

# 5. Constrói o sistema NestJS
RUN npm run build

# 6. Avisa ao Railway a porta de comunicação
EXPOSE 3000

# 7. Comando para ligar o servidor
CMD ["npm", "run", "start:prod"]
