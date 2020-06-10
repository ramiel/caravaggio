FROM node:12-alpine AS build

LABEL maintainer="Fabrizio Ruggeri"

RUN apk add \
        --verbose \
        --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ \
        --repository http://dl-3.alpinelinux.org/alpine/edge/community/ \
        --update-cache \
        vips-dev \
        binutils \
        fftw-dev \
        make \
        g++ \
        python \ 
    && rm -rf /var/cache/apk/*

RUN npm i -g pkg

WORKDIR /caravaggio

COPY package.json package-lock.json /caravaggio/

RUN npm install

COPY . /caravaggio

RUN npm run build

RUN pkg -t node12-alpine-x64 .

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
    --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ \
    --repository http://dl-3.alpinelinux.org/alpine/edge/community/ \
    vips \
    && rm -rf /var/cache/apk/*

COPY --from=build /caravaggio/caravaggio /caravaggio
COPY --from=build /caravaggio/node_modules/sharp/build/Release /caravaggio/sharp/build/Release
# COPY --from=build /caravaggio/node_modules/sharp/vendor/lib /caravaggio/sharp/vendor/lib
RUN chmod a+x /caravaggio/caravaggio
RUN ls -lh /caravaggio
EXPOSE 8565

ENTRYPOINT ["./caravaggio/caravaggio"]
