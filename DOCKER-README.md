## Caravaggio

![logo](https://ramiel.gitlab.io/caravaggio/img/caravaggio-logo.jpeg)

Caravaggio is an image proxy to serve images over the web after manipulating them.
You can find the complete documentation on the [Caravaggio website](https://ramiel.gitlab.io/caravaggio/).

### About this docker image

This docker image provide a production ready version of Caravaggio.    

### Start a Caravaggio server instance

Starting a Caravaggio instance is simple:

`$ docker run -ti --name some-caravaggio -p 8565:8565 -d ramielcreations/caravaggio:tag`

... where `some-caravaggio` is the name you want to assign to your container, `8565` is the default port exposed by the service and `tag` is the tag specifying the Caravaggio version you want (i.e. `latest`). See the list above for relevant tags.

### Configuration

For a full description of all the configuration options refer to the [official documentation](https://ramiel.gitlab.io/caravaggio/docs/configuration.html) 
i.e. to change the port and the cache system

`$ docker run -ti --name some-caravaggio -p 3333:3333 -d ramielcreations/caravaggio:tag --port 3333 --cache none`

### ... via docker stack deploy or docker-compose

Example stack.yml for Caravaggio:

```
version: '3.1'

services:

  imageproxy:
    image: ramielcreations/caravaggio:latest
    restart: always
    command: --port 8565 --progressive true
    ports:
      - 8565:8565
```

Run `docker stack deploy -c stack.yml caravaggio` (or `docker-compose -f stack.yml up`), wait for it to initialize completely, and visit `http://swarm-ip:8565`, `http://localhost:8565`, or `http://host-ip:8565` (as appropriate).

### Licenses

Read about [licenses](https://gitlab.com/ramiel/caravaggio/blob/master/LICENSE)
