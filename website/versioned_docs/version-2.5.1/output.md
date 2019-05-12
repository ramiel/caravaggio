---
id: version-2.5.1-output
title: Output
sidebar_label: Output
original_id: output
---

Caravaggio can return your image in another format. You my want to transform a `png` image into a 
progressive `jpeg`.    
Caravaggio supports `jpeg`, `png` `webp` and `tiff`.    

## Example

<pre><code class="hljs css html" data-preview>https://caravaggio.host/<strong>o_jpeg</strong>/https://goo.gl/EXv4MP</code></pre>

<pre><code class="hljs css html" data-preview>https://caravaggio.host/<strong>o_webp</strong>/https://goo.gl/EXv4MP</code></pre>

If you specify nothing or you enter `o_original`, the same format as the input image will be returned.

## Notes

If you installed caravaggio through the global npm module, you may need to ensure your version of `libvips`
supports the image formats you need. See the <a href="http://sharp.pixelplumbing.com/en/stable/install/" alt="sharp documentation about outputgo" target="_blank">sharp documentation<img style="display:inline" src="assets/external.png" width="12" /></a> about this.   
