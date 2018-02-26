---
id: general-usage
title: Using Caravaggio
sidebar_label: General
---

Caravaggio accept the input image to transform and the transformation to apply.

<pre><code class="hljs css html">http://caravaggio.host/<strong>q_90,o_webp</strong>/https://image.com/landscape.png</code></pre>

In this case the image reachable at `https://image.com/landscape.png` will be rotated of **`90° clockwise`** and the result will be in the **`webp`** format.

In general each transformation is expressed in the form **`transformation_parameter`** and can be separated
by the next through a comma **`,`**

The url instead, **`https://image.com/landscape.png`** is simply a fully qualifid address of the image to fetch and transform.

## Complex urls

If the url of the image to transform contains query parameters, you must encode it.    
In example, the url `https://image.com/landscape.png?user=joe` must be sent as

<pre><code class="hljs css html">https://caravaggio.host/q_90/https%3A%2F%2Fimage.com%2Flandscape.png%3Fuser%3Djoe</code></pre>

or at least

<pre><code class="hljs css html">https://caravaggio.host/q_90/https://image.com/landscape.png%3Fuser%3Djoe</code></pre>

In javascript, to obtain this encoding you can run

```js
const url = 'https://image.com/landscape.png?user=joe';
const encoded = encodeURIComponent(uri);
const caravaggioUrl = `https://caravaggio.host/q_90/${encoded}`;
```

Use similar functions in the language of your choice, they are the same functions used to encode query parameters.
