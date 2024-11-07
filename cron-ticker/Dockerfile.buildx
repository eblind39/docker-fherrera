#contiene las carpetas: /pp /usr /lib, etc
# $BUILDPLATFORM para usarse con buildx
#  https://docs.docker.com/build/building/multi-platform
FROM --platform=$BUILDPLATFORM node:19.2-alpine3.16

# cd /app
WORKDIR /app

#copiar al directorio destino /app
COPY . .

#eliminar archivos y dirs no necesarios en PROD && unicamente instalar las dependencias de produccion
RUN npm install && npm run test && rm -rf tests && rm -rf node_modules && npm install --prod

#comando Run de la imágen
CMD [ "node", "app.js" ]