#buildx + multistate + bun.sh
#dependencias de desarrollo
FROM --platform=$BUILDPLATFORM oven/bun:canary-alpine as dependencias
# cd /app
WORKDIR /app
#copiar al directorio destino /app
COPY package.json ./
#instalar dependencias
RUN bun install



FROM --platform=$BUILDPLATFORM oven/bun:canary-alpine as despliegue
WORKDIR /app
COPY --from=dependencias /app/node_modules ./node_modules
COPY . .
#realizar testing
RUN bun run test



FROM --platform=$BUILDPLATFORM oven/bun:canary-alpine as prod-dependencias
WORKDIR /app
COPY package.json ./
#instalar dependencias de produccion
RUN bun install --production



FROM --platform=$BUILDPLATFORM oven/bun:canary-alpine as ejecucion
WORKDIR /app
COPY --from=prod-dependencias /app/node_modules ./node_modules
COPY app.js ./
COPY tasks/ ./tasks
#comando Run de la imágen
CMD [ "bun", "app.js" ]