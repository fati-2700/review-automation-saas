FROM node:20-alpine

WORKDIR /app

# Copy package files and prisma
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including tsx)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start with tsx (runs TypeScript directly)
CMD npx prisma migrate deploy && npx tsx src/server.ts
