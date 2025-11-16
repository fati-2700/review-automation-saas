FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and prisma
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy prisma BEFORE npm install
COPY --from=builder /app/prisma ./prisma/

# Install production dependencies
RUN npm ci --only=production

# Generate Prisma Client in production
RUN npx prisma generate

# Copy built files
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start server
CMD sh -c "npx prisma migrate deploy && echo 'Starting server...' && node dist/server.js || (echo 'Server failed to start' && exit 1)"
