#########################
#
# Build image
#
#########################
FROM node:20-alpine AS builder

RUN apk --no-cache add build-base

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

RUN npm run build


#########################
#
# Final image
#
#########################
FROM node:20-alpine

LABEL maintainer="Fabrizio Ruggeri"

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the previous stage
COPY --from=builder /app/dist ./dist

COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 8565

ENTRYPOINT ["node", "dist/bin/caravaggio"]
