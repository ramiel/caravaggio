---
id: configuration
title: Configuration
sidebar_label: Configuration
---

Caravaggio try to meet the most common needs, so when you start it you already have a fully working system. Nonetheless Caravaggio is highly customizable.

## Developers

If you are a developer or run Caravaggio directly from the source, the default configuration file contains a lot of instructions. You can read it in <a href="https://gitlab.com/ramiel/caravaggio/blob/master/config/default.js" target="_blank">`config/default.js`</a>.

## Cli / global installation

When you install caravaggio globally, the cli accepts various configuration parameters. You can read the inline help running `caravaggio --help`.    
Here a deeper look to the parameter

### Server parameters

Caravaggio listen to port **8565** by default. You can change to the value you want

`caravaggio --port 1234`

### Cache

Caravaggio can cache the requests to serve file already processed faster. There are several different kinds of available cache.

**_None_**

This special cache do not store nothing. Each request will be re-processed by Caravaggio.    
This is extremely useful if you want to use a CDN in front of caravaggio which will take care of caching requests.

`caravaggio --cache none`

**_File_**

The cached images will be stored on your local file system.

`caravaggio --cache file`

The processed images will be saved on the operating system default temporary folder.    
You can change this path if you want:

`caravaggio --cache file --cache-filepath "path/to/cache/folder/"`

**_Memory_**

Enabled by default.    
In this case the cache will be stored in memory. It will be delete when the service is restarted.
This give you a fully working cache system with the speed of in-memory storage.

`caravaggio --cache memory`

By default the limit is to 100Mb, after this limit the older images will be removed.     
The limit can be changed:    

`caravaggio --cache memory --cache-limit 250`

or removed

`caravaggio --cache memory --cache-limit false`

**_S3_**

Amazon S3 cache will be implemented soon.

### Domain whitelist

By default caravaggio transform any image you feed him.     
If your service is publicly exposed you maybe want to restrict the list of domains from where the images can be taken.
This can be a list of domains and they can contain wildcards.

`caravaggio --whitelist myapp.s3.amazon.com, *.myapp.com`

### Logger

The amount of log can be increased

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

Caravaggio can report error in several format. By default the errors are reported in a `json` format to help machine parsing. The other accepted values
are `plain`, for a simple text report, and `html` for a pretty formatted report.

`caravaggio --errors plain`

### Compress

Caravaggio can compress the response through `deflate/gzip` if the requester (the browser usually), asks for it through `Accept-encoding` header.    
By default this option is turned off because it's common to setup a CDN to compress the result. To enable it:

`caravaggio --compress`
