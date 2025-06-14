# Etapa 1: Build Angular app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Construir en modo producción
RUN npm run build --prod

# Etapa 2: Servidor Nginx
FROM nginx:alpine

# Limpia el contenido HTML por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copia el build correcto (ajustado a Angular 18)
COPY --from=build /app/dist/sistema-pagos-frontend/browser /usr/share/nginx/html

# Opcional: nginx.conf personalizado (para SPA routing)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
