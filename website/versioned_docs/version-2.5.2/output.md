---
id: version-2.5.2-output
title: Output
sidebar_label: Output
original_id: output
---

Caravaggio can return your image in another format. You my want to transform a `png` image into a 
progressive `jpeg`.    
Caravaggio supports `jpeg`, `png` `webp` and `tiff`.    

## Example

<pre><code class="hljs css html" data-preview>https://caravaggio.now.sh/<strong>o_png</strong>/https://cvg-res.now.sh/girls.jpeg</code></pre>

<pre><code class="hljs css html" data-preview>https://caravaggio.now.sh/<strong>o_webp</strong>/https://cvg-res.now.sh/girls.jpeg</code></pre>

If you specify nothing or you enter `o_original`, the same format as the input image will be returned.

## Notes

If you installed caravaggio through the global npm module, you may need to ensure your version of `libvips`
supports the image formats you need. See the <a href="http://sharp.pixelplumbing.com/en/stable/install/" alt="sharp documentation about outputgo" target="_blank">sharp documentation <span class="external">![external-link](assets/external.png)</span></a> about this.   
