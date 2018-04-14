FROM node:8-alpine AS build

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

RUN npm i -g pkg

WORKDIR /caravaggio

COPY package.json package-lock.json /caravaggio/

RUN npm install --production


COPY . /caravaggio

RUN pkg -t node8-alpine-x64 .

RUN ls -l /caravaggio/node_modules/sharp/

#----- Image

FROM alpine

RUN mkdir -p /caravaggio
RUN mkdir -p /caravaggio/sharp/build
RUN mkdir -p /caravaggio/sharp/vendor


RUN apk update \
    && apk add --no-cache libstdc++ libgcc \
    && apk add \
    --update-cache \
    --repository https://dl-3.alpinelinux.org/alpine/edge/testing/ \
    vips \
    && rm -rf /var/cache/apk/*

COPY --from=build /caravaggio/caravaggio /caravaggio
COPY --from=build /caravaggio/node_modules/sharp/build/Release /caravaggio/sharp/build/Release
# COPY --from=build /caravaggio/node_modules/sharp/vendor/lib /caravaggio/sharp/vendor/lib
RUN chmod a+x /caravaggio/caravaggio
RUN ls -lh /caravaggio
EXPOSE 8565

ENTRYPOINT ["./caravaggio/caravaggio"]
