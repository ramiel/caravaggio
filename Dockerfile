FROM node:14-alpine AS build

LABEL maintainer="Fabrizio Ruggeri"

WORKDIR /caravaggio

COPY package.json package-lock.json /caravaggio/

RUN npm install

COPY . /caravaggio

RUN npm run build

EXPOSE 8565

ENTRYPOINT ["node", "dist/bin/caravaggio"]
