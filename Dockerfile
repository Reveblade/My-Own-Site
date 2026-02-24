# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Discord User ID for Lanyard — pass at build: docker build --build-arg VITE_DISCORD_USER_ID=your_id
ARG VITE_DISCORD_USER_ID
ENV VITE_DISCORD_USER_ID=$VITE_DISCORD_USER_ID

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
