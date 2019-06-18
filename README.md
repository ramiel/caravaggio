[![caravaggio logo](https://res.cloudinary.com/ramiel/image/upload/c_scale,r_0,w_100/v1517679412/caravaggio-logo_xdwpin.jpg)](https://res.cloudinary.com/ramiel/image/upload/c_scale,r_0,w_100/v1517679412/caravaggio-logo_xdwpin.jpg)    
# Caravaggio


[![pipeline status](https://gitlab.com/ramiel/caravaggio/badges/master/pipeline.svg)](https://gitlab.com/ramiel/caravaggio/commits/master)
[![coverage report](https://gitlab.com/ramiel/caravaggio/badges/master/coverage.svg)](https://gitlab.com/ramiel/caravaggio/commits/master)

A blazing fast ⚡ image manipulation service.

Read the complete documentation at [ramiel.gitlab.io/caravaggio](https://ramiel.gitlab.io/caravaggio)

## Note

From version `2.x` this project is ready for production. If you have still version 1.x, upgrade please. There is no migration guide since
the first version was intended for test only

## Installation

### NPM

```
npm i -g caravaggio
caravaggio
```

### Docker

An image is provided

```
docker pull ramielcreations/caravaggio
docker run --name caravaggio -p 8565:8565 -dti ramielcreations/caravaggio:latest
```

Refer to the [page on the docker store](https://store.docker.com/community/images/ramielcreations/caravaggio) for its configuration


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

Please, refer to the [documentation](https://ramiel.gitlab.io/caravaggio) to know what are the available operations.


## Thank you

This project is possible thanks to 
- [sharp](http://sharp.pixelplumbing.com/en/stable/) - A js image processing library
- [micro](https://github.com/zeit/micro) - A fast microservice library 
- A lot of other great developers
- The amazing photographers on [pexels.com](https://www.pexels.com/)


# Licensing

This package is free to use for commercial purposes for a trial period under the terms of the [Prosperity Public License](./LICENSE).

Licenses for long-term commercial use are available via [licensezero.com](https://licensezero.com).

[![licensezero.com pricing](https://licensezero.com/projects/0409c5bf-201d-49dd-af6e-2aa5169cf15a/badge.svg)](https://licensezero.com/projects/0409c5bf-201d-49dd-af6e-2aa5169cf15a)