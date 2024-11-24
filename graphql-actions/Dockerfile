
FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY ./graphql-actions/package.json /app/package.json
RUN yarn install --frozen-lockfile


FROM node:19-alpine3.15 as app-builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules /app/node_modules
COPY ./graphql-actions/*.* /app
# RUN yarn test
RUN yarn build

FROM node:19-alpine3.15 as prod-deps
WORKDIR /app
COPY ./graphql-actions/package.json /app/package.json
RUN yarn install --prod --frozen-lockfile


FROM node:19-alpine3.15 as prod
EXPOSE 3000
WORKDIR /app
#ENV APP_VERSION=${APP_VERSION}
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=app-builder /app/dist /app/dist

CMD [ "node","dist/main.js"]
#CMD [ "ls","/app/dist/main.js"]