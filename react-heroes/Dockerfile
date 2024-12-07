
FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY ./package.json .
RUN yarn install --frozen-lockfile


FROM node:19-alpine3.15 as app-builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules /app/node_modules
COPY . .
# RUN yarn test
RUN yarn build


FROM nginx:1.23.3 as prod-deploy
EXPOSE 80
WORKDIR /usr/share/nginx/html
COPY --from=app-builder /app/dist .
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./assets ./assets

CMD [ "nginx","-g","daemon off;"]