# Step 1: Build the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the full app source and build it
COPY . .
RUN npm run build

# Step 2: Run the app using next start
FROM node:18-alpine AS runner
WORKDIR /app

# Only copy what's needed to run
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./

EXPOSE 3000

CMD ["npx", "next", "start", "-H", "0.0.0.0"]
