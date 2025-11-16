FROM node:20-alpine

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

# Expose port
EXPOSE 3000

# Start server
CMD sh -c "npx prisma migrate deploy && echo 'Migrations done' && ls -la dist/ && node dist/server.js"
