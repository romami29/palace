FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./public ./public
COPY ./src ./src
RUN npm run build

FROM nginx:alpine

# Create directory for certificates
RUN mkdir -p /etc/nginx/ssl

# Generate private key and certificate in one command
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/nginx-selfsigned.key \
  -out /etc/nginx/ssl/nginx-selfsigned.crt \
  -subj "/CN=YOUR_IP_ADDRESS"

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]