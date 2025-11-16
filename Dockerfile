FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD sh -c "npx prisma migrate deploy && echo 'Migrations done' && ls -la dist/ && node dist/server.js"
