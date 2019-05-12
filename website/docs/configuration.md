---
id: configuration
title: Configuration
sidebar_label: Configuration
---

Caravaggio tries to meet the most common needs so when you start it, you already have a fully working system. Nonetheless Caravaggio is highly customizable.

## Cli / global installation

When you install Caravaggio globally, the cli accepts various configuration parameters. You can read the inline help running `caravaggio --help`.    
Here a deeper look to the available parameters

### Server configuration

Caravaggio listens to port **8565** by default. You can change it to the value you prefer:

`caravaggio --port 1234`

### Caches

Caravaggio has different cache levels and any can be disabled and configured indipendently from each other.

#### Output cache

This cache stores the resulting image. If you make a second request to get the same image with the same transformations, this cache will hit and the cached result will be returned. The image won't be processed again. By default this cache is set to `memory`.

#### Input cache

If you change the transformations to apply, the original image will be downloaded again unless you activate the input cache. If this cache is activated the original image will be stored and therefore it won't be downloaded again. The image will be just re-processed to evaluate the new transformations to apply.    
This cache is disabled by default.

### Cache configuration

Each cache can use a different method to save/retrieve cached resources. All of those methods applies to any kind of cache.

**_None_**

This special cache doesn't store anything. Each request will be re-processed by Caravaggio.    
This is extremely useful if you want to use a CDN in front of Caravaggio which will take care of caching requests.

`caravaggio --cache none`       For the output cache    
`caravaggio --inputcache none`  For the input cache

**_File_**

The cached images will be stored on your local file system.

`caravaggio --cache file`      For the output cache    
`caravaggio --inputcache file` For the input cache

The processed images will be saved on the operating system default temporary folder.    
You can change this path if you want:

`caravaggio --cache file --cache-filepath "path/to/cache/folder/"`      For the output cache    
`caravaggio --inputcache file --inputcache-filepath "path/to/cache/folder/"` For the input cache

**_Memory_**

In this case the cache will be stored in memory. It will be delete when the service is restarted.
This give you a fully working cache system with the speed of in-memory storage.

`caravaggio --cache memory`      For the output cache    
`caravaggio --inputcache memory` For the input cache

By default the limit is *100MB*. After this limit is reached, the older images are removed.     
The limit can be changed:    

`caravaggio --cache memory --cache-limit 250`           For the output cache    
`caravaggio --inputcache memory --inputcache-limit 250` For the input cache

or removed (no limit)

`caravaggio --cache memory --cache-limit false`           For the output cache    
`caravaggio --inputcache memory --inputcache-limit false` For the input cache

### Domains whitelist

By default Caravaggio transforms any image you feed him.     
If your service is publicly exposed you may want to restrict the list of domains from where the images can be taken.
This can be a list of domains separated by space and it can contain wildcards.

`caravaggio --whitelist "myapp.s3.amazon.com" "*.myapp.com"`

### Logs

The amount of logs can be increased

`caravaggio -v`

or reduced to nothing

`caravaggio -q`

Caravaggio, by default, prints very readable messages on standard out. It can be configured to produce json instead

`caravaggio --json`

### Guess file type by extension

Caravaggio reads the file metadata to retrieve information about the file type. It can be configured to use the file extensions instead

`caravaggio --guess-type-by-extension`

In case the file extension is missing, caravaggio will fallback to metadata. For some transformation, reading the metadata is mandatory.    
Caravaggio does not access metadata more than once per file so, most of the times, enabling this options is useless.    
By default this option is disabled

### Progressive images

For the image formats where this is applicable, Caravaggio produces progressive images. This is the best choice on the web since the images
can start to render before being entirely downloaded.    
This behavior can be disabled

`caravaggio --progressive false`

### Errors

Caravaggio can report errors in several format. By default the errors are reported in a `json` format to help machine parsing. The other accepted values
are `plain`, for a simple text report, and `html` for a pretty formatted report.

`caravaggio --errors plain`

### Compress

Caravaggio can compress the response through `deflate/gzip` if the requester (the browser usually), asks for it through `Accept-encoding` header.    
By default this option is turned off because it's common to setup a CDN to compress the result. To enable:

`caravaggio --compress`


## Contributors and developers

If you are a developer or run Caravaggio directly from the source, the default configuration file contains a lot of instructions. You can read it in <a href="https://gitlab.com/ramiel/caravaggio/blob/master/config/default.js" target="_blank">`config/default.js`</a>.

> __Note__: Any change to the schema of this file is not considered a breaking change, so the keys can change also because of a minor release.
> This is because it is intended for developers only, while the only stable interface is the `cli`.
