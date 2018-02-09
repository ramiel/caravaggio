---
id: configuration
title: Configuration
sidebar_label: Configuration
---

Caravaggio try to meet the most common needs, so when you start it you already have a fully working system. Nonetheless caravaggio is highly customizable.

Depending on the way you choose to install caravaggio there migth be differences in the way it can be configured. We try to cover all of these here but please, refer to the [docker documentation](https://store.docker.com/community/images/ramielcreations/caravaggio) to configure your containers, or the _cli_ inline help.

## Developers

If you are a developer or run caravaggio directly from the source, the default configuration file contains a lot of instructions. You can read it in <a href="https://gitlab.com/ramiel/caravaggio/blob/master/config/default.js" target="_blank">`config/default.js`</a>.

## Server parameters

Caravaggio listen to port **8565** by default. You can change to the value you want

| cli         | docker (env variable) | config file  |
|-------------|-----------------------|--------------|
| --port 1234 | CARAVAGGIO_PORT=1234  | "port": 1234 |
## Cache

Caravaggio can cache the request to serve file already processed fast. There are several different kind of available cache.

**_None_**

This special cache do not store nothing. Each request will be re-processed by caravaggio. This is extremely useful if you want to use a CDN in front of caravaggio which will take care of caching requests

| cli         | docker (env variable)           | config file                   |
|-------------|---------------------------------|-------------------------------|
| --cache none| CARAVAGGIO_PERSISTOR_TYPE=none  | "peristor":{ "type": "none" } |

**_File_**

In this case the processed file will be saved on the local filesystem.

<table>
  <tr>
    <th>cli</th>
    <th>docker (env variable)</th>
    <th>config file</th>
  </tr>
  <tr>
    <td>
      --cache file
      --cache-filepath "path/to/cache/folder/"
    </td>
    <td>
      CARAVAGGIO_PERSISTOR_TYPE=file
      CARAVAGGIO_PERSISTOR_FILE_PATH="path/to/cache/folder/"
    </td>
    <td>
      <pre>
"persistor": {
  "type": "file",
  "options": {
    "basePath": "path/to/cache/folder/"
  }
}
      </pre>
    </td>
  </tr>
</table>

**_Memory_**

The cache will be in memory. It will be delete when the service is restarted.
By default the limit is to 100Mb, after this limit the older images will be removed.
The limit can be changed or removed

<table>
  <tr>
    <th>cli</th>
    <th>docker (env variable)</th>
    <th>config file</th>
  </tr>
  <tr>
    <td>
      --cache memory  <br />
      --cache-limit 250 <br />
      the limit will to 250Mb
      <br />
      <p>
      --cache-limit=false
      remove the limit
      </p>
    </td>
    <td>
      CARAVAGGIO_PERSISTOR_TYPE=memory
      CARAVAGGIO_PERSISTOR_MEMORY_LIMIT=false 
      // remove the limit
    </td>
    <td>
      <pre>
"persistor": {
  "type": "memory",
  "options": {
    "limit": 1024 // 1GB limit
  }
}
      </pre>
    </td>
  </tr>
</table>

## Domain whitelist

By default caravaggio transform any image you feed him.     
If your service is publicly exposed you maybe want to restrict the list of domain from where the images can be taken.
This can be a list of domains and they can contain wildcards.

<table>
  <tr>
    <th>cli</th>
    <th>docker (env variable)</th>
    <th>config file</th>
  </tr>
  <tr>
    <td>
      --whitelist myapp.s3.amazon.com, *.myapp.com
    </td>
    <td>
      CARAVAGGIO_WHITELIST="myapp.s3.amazon.com, *.myapp.com"
    </td>
    <td>
      <pre>
"whitelist": ["myapp.s3.amazon.com", "*.myapp.com"]
      </pre>
    </td>
  </tr>
</table>

## Logger

TBD

## Guess file type by extension

TBD

## Default transformations

TDB