FROM node:8
# FROM wjordan/libvips

LABEL maintainer="Fabrizio Ruggeri"

# RUN apk add vips-dev fftw-dev --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/

WORKDIR /caravaggio

COPY package.json package-lock.json /caravaggio/

RUN npm install --production

COPY . /caravaggio


CMD ["npm", "start"]
