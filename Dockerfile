FROM node:8

LABEL maintainer="Fabrizio Ruggeri"

# RUN apk add vips-dev binutils fftw-dev make g++ --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/

WORKDIR /caravaggio

COPY package.json package-lock.json /caravaggio/

RUN npm install --production

COPY . /caravaggio

ENV NODE_ENV=docker

EXPOSE 8565

CMD ["npm", "start"]
