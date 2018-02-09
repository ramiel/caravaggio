---
id: installation
title: Install
sidebar_label: Install
---

Caravaggio can be installed in different ways, through docker or with npm. Depending on your needs you find here the install options

## Docker

The easiest way to install Carvaggio si through docker. It's the suggested way of installing it in production since it can be easily scaled and restarted.

```bash
docker pull ramielcreations/caravaggio
docker run --name caravaggio -dti ramielcreations/caravaggio
```

Now Caravaggio will be available on port **8565**. To change the port or to run it with different options, refer to the [docker documentation](https://store.docker.com/community/images/ramielcreations/caravaggio).
## Npm

_This mode is not yet available_    
You can install caravaggio globally with

```bash
npm install -g caravaggio
```

and then run it with

```bash
caravaggio
```

Pass _--help_ to discover the available options
## Git

Youo can clone from the git repository stored on gitlab.

```bash
git clone git@gitlab.com:ramiel/caravaggio.git
```

Now you can run it with

```bash
npm start
```

Refer to the developer documentation (_not yet available_)