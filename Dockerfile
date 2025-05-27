# Step 1: Build the Vite App
FROM node:22.14.0-alpine AS build

# Accept VITE_API_BASE_URL as build-time argument
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

WORKDIR /app

# Copy only package files to cache layers
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app using VITE_* env var
RUN npm run build

# Step 2: Serve with NGINX
FROM nginx:1.23-alpine

# Clean the default nginx static directory
RUN rm -rf /usr/share/nginx/html/*

# Copy built files to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
