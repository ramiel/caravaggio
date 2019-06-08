---
id: extract
title: Extract
sidebar_label: Extract
---

Extract let you select an arbitrary portion of the input image specifying the coordinates and the size of the extraction.

The parameters are, in the order, `x`, `y`, `width` and `height`.

**Original**
![A kitchen, somebody prepares a cake](assets/example/cakes_original.jpeg)

<pre><code class="hljs css html" data-preview data-previewimage="https://cvg-res.now.sh/cakes_original.jpeg">https://caravaggio.now.sh/<strong>ex_95_35_100_100</strong>/https://cvg-res.now.sh/cakes_original.jpeg</code></pre>

![Same kitchen, only the cake is shown](assets/example/cakes_extracted.jpeg)

Both dimension and coordinates can be specified as pixel or percentage. See [sizes](resize.html#sizes) documentation.
