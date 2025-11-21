# Dockerfile for todoReduxToolkit React app
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY REACT/11todoReduxToolkit/package.json REACT/11todoReduxToolkit/package-lock.json ./
RUN npm ci --silent

# Copy source and build
COPY REACT/11todoReduxToolkit/ ./
RUN npm run build

# Nginx stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY REACT/11todoReduxToolkit/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
