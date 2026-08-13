# Multi-stage Dockerfile for production
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --production --prefer-offline --no-audit --no-fund \
	&& node -e "require('body-parser'); console.log('body-parser present')"
COPY . .

FROM node:18-alpine AS runner
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
USER appuser
CMD ["node", "server.js"]
