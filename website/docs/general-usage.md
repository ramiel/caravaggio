---
id: general-usage
title: Using Caravaggio
sidebar_label: General
---

Caravaggio accept the input image to transform and the transformation to apply.

<pre><code class="hljs css html" data-preview data-previewimage="https://cvg-res.now.sh/landscape.jpg">https://caravaggio.now.sh/<strong>rotate_90,o_png</strong>/https://cvg-res.now.sh/landscape.jpg</code></pre>

In this case the image reachable at `https://cvg-res.now.sh/landscape.jpg` will be rotated of **`90° clockwise`** and the result will be in the **`webp`** format.

In general, each transformation is expressed in the form **`transformation_parameter`** and can be separated
by the next through a comma **`,`**

The url instead, **`https://cvg-res.now.sh/landscape.jpg`** is simply a fully qualifid address of the image to fetch and transform.

## Complex urls

If the url of the image to transform contains query parameters, you must encode it.    
In example, the url `https://cvg-res.now.sh/landscape.jpg?user=joe` must be sent as

<pre><code class="hljs css html">https://caravaggio.now.sh/q_90/<strong>https%3A%2F%2Fcvg-res.now.sh%2Flandscape.jpg%3Fuser%3Djoe</strong></code></pre>

or at least

<pre><code class="hljs css html">https://caravaggio.now.sh/q_90/<strong>https://cvg-res.now.sh/landscape.jpg%3Fuser%3Djoe</strong></code></pre>

In javascript, to obtain this encoding, you can run

```js
const url = 'https://cvg-res.now.sh/landscape.jpg?user=joe';
const encoded = encodeURIComponent(url);
const caravaggioUrl = `https://caravaggio.now.sh/q_90/${encoded}`;
```

Use similar functions in the language of your choice, they are the same functions used to encode query parameters.
