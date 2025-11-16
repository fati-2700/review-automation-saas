FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD sh -c "echo 'Step 1: Running migrations' && \
           npx prisma migrate deploy && \
           echo 'Step 2: Migrations complete' && \
           echo 'Step 3: Listing files' && \
           ls -la src/ && \
           echo 'Step 4: Starting server' && \
           npx tsx src/server.ts"
