---
id: version-1.x-resize
title: Resize
sidebar_label: Resize
original_id: resize
---

You can resize an image specifing the new dimension in pixel or in percentage.

## Pixel

<code>http&#8203;:&#8203;//caravaggio.host/<strong>resize_640x480</strong>/https&#8203;:&#8203;//goo.gl/EXv4MP</code>

**Original**     
<img width="320" height="240" src="assets/example/girls.jpeg" />

**Result**     
<img width="160" height="120" src="assets/example/girls.jpeg" />

It's possible to specify only the width:

<code>http&#8203;:&#8203;//caravaggio.host/<strong>resize_640x</strong>/https&#8203;:&#8203;//goo.gl/EXv4MP</code>

In this case the other dimension will be scaled accordingly. The same for the height:

<code>http&#8203;:&#8203;//caravaggio.host/<strong>resize_x480</strong>/https&#8203;:&#8203;//goo.gl/EXv4MP</code>

## Percentage

If the width or the heigth (or both) are numbers below 1, they will be interpreted as percentage of the original image size

<code>http&#8203;:&#8203;//caravaggio.host/<strong>resize_0.5x0.2</strong>/https&#8203;:&#8203;//goo.gl/EXv4MP</code>

In this case the image will have a width which is **`50%`** of the original width and an height which is
**`20%`** of original height.

Also in this case one or the other dimansion can be excluded

<code>http&#8203;:&#8203;//caravaggio.host/<strong>resize_x0.2</strong>/https&#8203;:&#8203;//goo.gl/EXv4MP</code>

