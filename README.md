[![caravaggio logo](https://res.cloudinary.com/ramiel/image/upload/c_scale,r_0,w_100/v1517679412/caravaggio-logo_xdwpin.jpg)](https://res.cloudinary.com/ramiel/image/upload/c_scale,r_0,w_100/v1517679412/caravaggio-logo_xdwpin.jpg)    
# Caravaggio


[![pipeline status](https://gitlab.com/ramiel/caravaggio/badges/master/pipeline.svg)](https://gitlab.com/ramiel/caravaggio/commits/master)
[![coverage report](https://gitlab.com/ramiel/caravaggio/badges/master/coverage.svg)](https://gitlab.com/ramiel/caravaggio/commits/master)

A blazing fast ⚡ image manipulation service.

## Note

This is an early release of this software! This is **not** yet suitable for production.    
The docker image is not yet production ready.    
The api can change without any warning.    
Feel free to contribute to make this an amazing project!

## Installation

### Docker

An image is provided

`docker pull ramielcreations/caravaggio`

Refer to the [page](https://store.docker.com/community/images/ramielcreations/caravaggio) on the docker store for its configuration

### Node

```
npm i -g caravaggio
caravaggio
```

### Git

```
git clone git@gitlab.com:ramiel/caravaggio.git
cd caravaggio
npm install
npm start
```

## Using the service

The service is avaiable at `http://localhost:8565/`

and can be used sending a set of options and an image:    
`http://localhost:8565/rotate_90/https://image.com/pony.jpg`

## Available operations

Please, refer to the [documentation](http://localhost:3000/caravaggio/docs/general-usage.html) to know what are the available operations


## Thank you

This project is possible thanks to 
- [sharp](http://sharp.pixelplumbing.com/en/stable/) - A js image processing library
- [micro](https://github.com/zeit/micro) - A fast microservice library 
- A lot of other great developers