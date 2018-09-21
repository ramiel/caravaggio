---
id: version-2.3.5-extract
title: Extract
sidebar_label: Extract
original_id: extract
---

Extract let you select an arbitrary portion of the input image specifying the coordinates and the size of the extraction.

The parameters are, in the order, `x`, `y`, `width` and `height`.

**Original**
<a href="assets/example/cakes_original.jpeg" target="_blank"><img src="assets/example/cakes_original.jpeg" /></a>

<pre><code class="hljs css html" data-preview data-previewimage="https://ramiel.gitlab.io/caravaggio/docs/assets/example/cakes_original.jpeg">http://caravaggio.host/<strong>ex_95_35_100_100</strong>/https://goo.gl/wcnQSx</code></pre>

<a href="assets/example/cakes_extracted.jpeg" target="_blank"><img src="assets/example/cakes_extracted.jpeg" /></a>

Both dimension and coordinates can be specified as pixel or percentage. See [sizes](resize.html#sizes) documentation.
