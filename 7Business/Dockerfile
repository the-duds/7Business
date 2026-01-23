# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# custom nginx config (optional) could be provided
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
