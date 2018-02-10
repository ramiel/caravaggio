---
id: general-usage
title: Using Caravaggio
sidebar_label: General
---

Caravaggio accept the input image to transform and the transformation to apply.

<code>http&#8203;//caravaggio.now.sh/<strong>q_90,o_webp</strong>/https&#8203;//image.com/landscape.png</code>

In this case the image reachable at `https://image.com/landscape.png` will be rotated of **`90° clockwise`** and the result will be in the **`webp`** format.

In general each transformation is expressed in the form **`transformation_parameter`** and can be separated
by the next through a comma **`,`**

The url instead, **`https://image.com/landscape.png`** is simply a fully qualifid address of the image to fetch and transform.