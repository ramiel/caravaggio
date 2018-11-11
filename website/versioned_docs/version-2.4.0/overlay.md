---
id: version-2.4.0-overlay
title: Overlay
sidebar_label: Overlay (watermarks)
original_id: overlay
---

You can overlay an image with another. This feature is useful if you wish to create a watermark or simply
an image composition

## Usage

<pre><code class="hljs css html" data-preview>https://caravaggio.now.sh/<strong>overlay_https%3A%2F%2Framiel.gitlab.io%2Fcaravaggio%2Fimg%2Fcaravaggio-logo.jpeg_gsoutheast</strong>/https://goo.gl/EXv4MP</code></pre>

Accepted parameters are    
**url**: the url of the overlay image. The url **must** be escaped and must be the first parameter.    
**g**: the gravity to position the overlay. This is ignored if specific coordinates are passed.     
**x:** The position on the right-left axis.    
**y:** The position on the top-bottom axis.    
**watermark**: Repeat the overlay image

**Original**   
![Two girls](assets/example/girls_small.jpeg)

**Result**     
![Overlayed with](assets/example/overlay.jpeg)

## Examples

### Position with gravity

You can position the watermark using the gravity parameter. Here an example putting the watermark on the west (center-left) side of the image.

<pre><code class="hljs css html" data-preview>https://caravaggio.now.sh/<strong>overlay_https%3A%2F%2Framiel.gitlab.io%2Fcaravaggio%2Fimg%2Fcaravaggio-logo.jpeg_gw</strong>/https://goo.gl/EXv4MP</code></pre>

**Result**     
![Overlayed with](assets/example/overlay-west.jpeg)


### Positioning with coordinates

You can specify coordinates to position the overlay. In that case any gravity values will be ignored. Let's position the overlay at position `x: 100px` and `y: 60%` of the total image height. Coordinates refers to top-left corner of the overlay.    
`x` and `y` can be expressed as pixels or percentage as explained [here](resize.html#sizes).

<pre><code class="hljs css html" data-preview>https://caravaggio.now.sh/<strong>overlay_https%3A%2F%2Framiel.gitlab.io%2Fcaravaggio%2Fimg%2Fcaravaggio-logo.jpeg_x100_y0.6</strong>/https://goo.gl/EXv4MP</code></pre>

**Result**     
![Overlayed with](assets/example/overlay-coords.jpeg)

### Watermark repeat

The overlay can be repeated using `watermark` option.

<pre><code class="hljs css html" data-preview>https://caravaggio.now.sh/<strong>overlay_"https%3A%2F%2Fgitlab.com%2Framiel%2Fcaravaggio%2Fraw%2Fmaster%2Fwebsite%2Fstatic%2Fimg%2Foverlay.png%3Finline%3Dfalse"_watermark</strong>/https://goo.gl/EXv4MP</code></pre>

**Result**     
![Overlayed with](assets/example/overlay-watermark.jpeg)
