---
id: version-2.6.0-install
title: Install
sidebar_label: Install
original_id: install
---

Caravaggio can be installed in different ways, through docker or with npm. Depending on your needs, find here your way.

## Npm

You can install Caravaggio globally with

```bash
npm install -g caravaggio
```

and then run it with

```bash
caravaggio
```

Pass `--help` to discover the available options

## Docker

The easiest way to install Carvaggio is through docker. It's the suggested way of installing it in production since it can be easily scaled and restarted.

```bash
docker pull ramielcreations/caravaggio
docker run --name caravaggio -p 8565:8565 -dti ramielcreations/caravaggio:latest
```

Caravaggio will be available on port **`8565`**. To change the port or to run it with different options, refer to the [docker documentation](https://hub.docker.com/r/ramielcreations/caravaggio).

## Git

Developers can clone from the gitlab repository.

```bash
git clone git@gitlab.com:ramiel/caravaggio.git
```

Now you can run it with

```bash
cd caravaggio
npm install
npm start
```
