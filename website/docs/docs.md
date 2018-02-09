---
id: docs
title: What is caravaggio
sidebar_label: What is caravaggio
---

Caravaggio is a fast image proxy written in node.js.    

It is basically a webservice which let you manipulate images before serving them to your audience on your website or in your application. It can be used with an external CDN like [CloudFlare](https://www.cloudflare.com/) or it can cache the images itself.

## What it's not

Caravaggio tries to achieve a clear goal and to outperform at it.
In order to focus on the main goal, it is _not_ designed to do the following things:

- Store your images. You cannot upload your images onto Caravaggio and later retrieve them; you always need an external place to store your data like S3 or others. Caravaggio can store your images when it acts as a cache but only for faster response time. This data have to be considered volatile. Look at [cache configuration](configuration.md#cache)
- An API. At the moment Caravaggio does not expose any API.