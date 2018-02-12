FROM node:8-alpine

LABEL maintainer="Fabrizio Ruggeri"

RUN apk add \
        --update-cache \
        --repository https://dl-3.alpinelinux.org/alpine/edge/testing/ \
        vips-dev \
        binutils \
        fftw-dev \
        make \
        g++\
    && rm -rf /var/cache/apk/*

WORKDIR /caravaggio

COPY package.json package-lock.json /caravaggio/

RUN npm install --production

RUN apk del vips-dev \
  binutils \
  fftw-dev \
  make \
  g++ \
  && rm -rf /var/cache/apk/*

RUN apk add \
  --update-cache \
  --repository https://dl-3.alpinelinux.org/alpine/edge/testing/ \
  vips \
  && rm -rf /var/cache/apk/*

COPY . /caravaggio

EXPOSE 8565

ENTRYPOINT ["./bin/caravaggio"]
