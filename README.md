# docker-fherrera
Del curso docker para desarrolladores by Fernando Herrera

> Resources & instalaciones-docker.md
>> https://gist.github.com/Klerith/3f611ff0e5c15b733ac63365ab310a35

> Sección 3: Volúmenes y redes
>> https://gist.github.com/Klerith/0cc4a1fffd817f78f4dca41c900e3c8e

> Sección 4: Docker Compose
>> https://gist.github.com/Klerith/8cfc637868212cfb888333ecaa6080e1

https://www.npmjs.com/package/node-cron

## docker cli commands

```sh
docker images ls --all

docker pull mariadb:jammy

docker container ls

docker container ls --all

docker exec -it 460b3cf39dab /bin/bash

docker container inspect 70c4021e618a

docker container start my-postgres14

docker container stop my-postgres14

docker container logs my-postgres14

docker container rm -f 2577ae2b026a1992978536db7bb904ea43c57b39fbba9b4d8f44d9b2a754574f

docker volume create world-db

docker volume ls

docker volume inspect world-db

docker volume rm -f world-db

docker container run --name world-db -d -p 3306:3306 -e MARIADB_USER=example-user -e MARIADB_PASSWORD=user-password -e MARIADB_ROOT_PASSWORD=root-secret-password -e MARIADB_DATABASE=world-db --volume world-db:/var/lib/mysql mariadb:jammy

docker container run --name phpmyadmin -d -e PMA_ARBITRARY=1 -p 8080:80 8ec7b60cca6c

docker network --help

docker network ls

docker network create world-net

docker network connect world-net 8225f9b74c6c
docker network connect world-net f567c8133cad

docker network inspect world-net

docker network rm -f world-net

docker container run --name nest-app -w /app -p 80:3000 -v "$(pwd)":/app node:16-alpine3.16 sh -c "yarn install && yarn start:dev"

docker container exec -it 1d7695fb55477aa8cc8eb465f390c0cdae2861e8f51bda7974363b0bf47bb662 /bin/sh
```

> Docker Hub images - Laboratorio
```sh
	docker volume create postgres-db

	docker container run -dp 5432:5432 --name postgres-db -e POSTGRES_PASSWORD=123456 -v postgres-db:/var/lib/postgresql/data postgres:15.1

	docker container run --name pgAdmin -e PGADMIN_DEFAULT_PASSWORD=123456 -e PGADMIN_DEFAULT_EMAIL=superman@google.com -dp 8080:80 dpage/pgadmin4:6.17

	docker network create postgres-net

	docker network ls

	docker container ls --all

	docker network connect postgres-net 5fe6b7518359

	docker network connect postgres-net 02d2ef1e47c0

	docker network inspect postgres-net

	docker container rm -f f12d7d8781b5 02d2ef1e47c0

	docker volume rm postgres-db

	docker network rm postgres-net
```

> Una vez creado docker-compose.yml
```sh
docker compose up

docker compose down

docker volume ls

docker volume rm postgres-pgadmin_postgres-db

docker volume prune

docker image rm 88843c71ff11 178f27190ac4 ccd94e8b5fd9 8ec7b60cca6c 7ac3e08c2412

docker compose -f compose.yml up

docker compose -f compose.yml down

chown -R 5050:5050 ./data-vol/pgAdmin

docker compose -f docker-compose.yml up

docker compose -f docker-compose.yml down

docker build --tag cron-ticker .		#por defecto tag 'latest'

docker build --tag cron-ticker:1.0.0 .		#con tag especifico

docker image tag cron-ticker:1.0.0 cron-ticker:conejo		#renombrar tag

docker image tag cron-ticker cron-ticker:castor			#lo mismo que:
docker image tag cron-ticker:latest cron-ticker:castor

docker login
```

> Crear repo en hub.docker.com (eblind39/cron-ticker)
> y renombrar image al formato del repo
```sh
docker image tag cron-ticker eblind39/cron-ticker		#lo mismo que:
docker image tag cron-ticker:latest eblind39/cron-ticker:latest

docker push eblind39/cron-ticker	#lo mismo que:
docker push eblind39/cron-ticker:latest
```

> Darle un nombre significativo a la versión latest
```sh
docker image tag eblind39/cron-ticker:latest eblind39/cron-ticker:castor

docker push eblind39/cron-ticker:castor

docker container run eblind39/cron-ticker:castor

docker logout
```

> buildx
```sh
docker buildx ls

docker buildx create --name mybuilder --driver docker-container --bootstrap

docker buildx use mybuilder

docker buildx ls
```
### output
#### AME/NODE     DRIVER/ENDPOINT             STATUS  BUILDKIT             PLATFORMS
#### mybuilder *   docker-container

```sh
docker buildx inspect
```
### lista todos los detalles del builder seleccionado por defecto

```sh
docker buildx build --platform linux/amd64,linux/arm64,linux/mips64,linux/arm/v7 --tag eblind39/cron-ticker:latest --push .
```

> list in hub.docker.com
#### Digest		OS/ARCH		Last pull	Compressed Size
#### 60d1a398a57b	linux/amd64	---		55.32 MB
#### 1b0c33190ec3	linux/arm/v7	---		55.32 MB
#### cf04c5961b2d	linux/arm64	---		55.32 MB
#### 51cd144bc743	linux/mips64	---		55.32 MB

### darle tag descriptivo a nuestro latest para que no sea sobre-escrito por otro latest a futuro
```sh
docker buildx build --platform linux/amd64,linux/arm64,linux/mips64,linux/arm/v7 --tag eblind39/cron-ticker:guacamayo --push .
```

## Multi-State Build
* Variables de entorno para ambientes
* Stages como:
    * dev
    * dependencies
    * prod-dependencies
    * prod
    * runner
    * builder
    * tester
* Configuraciones adicionales
* Dockerfile + Docker Compose
* Bind mounts en Compose
* Seleccionar un stage específico a ejecutar únicamente
* Docker Compose para producción
* Auto tag en Compose

### eliminar mybuilder
```sh
docker buildx ls

docker buildx use default

docker buildx rm mybuilder
```

> ## COPY vs ADD & Dockerfile COPY command
> https://phoenixnap.com/kb/docker-add-vs-copy
>> https://docs.docker.com/reference/dockerfile/#copy