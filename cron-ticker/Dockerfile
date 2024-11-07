#dependencias de desarrollo
FROM node:19.2-alpine3.16 as dependencias
# cd /app
WORKDIR /app
#copiar al directorio destino /app
COPY package.json ./
#instalar dependencias
RUN npm install



FROM node:19.2-alpine3.16 as despliegue
WORKDIR /app
COPY --from=dependencias /app/node_modules ./node_modules
COPY . .
#realizar testing
RUN npm run test



FROM node:19.2-alpine3.16 as prod-dependencias
WORKDIR /app
COPY package.json ./
#instalar dependencias de produccion
RUN npm install --prod



FROM node:19.2-alpine3.16 as ejecucion
WORKDIR /app
COPY --from=prod-dependencias /app/node_modules ./node_modules
COPY app.js ./
COPY tasks/ ./tasks
#comando Run de la imágen
CMD [ "node", "app.js" ]