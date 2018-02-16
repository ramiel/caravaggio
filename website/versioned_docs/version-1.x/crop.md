---
id: version-1.x-crop
title: Crop
sidebar_label: Crop
original_id: crop
---

❗ The behavior of this feature is not consistent, so it will change soon ❗

You can resize and crop an image specifing the new dimensions and the gravity. This will result in a portion of the original image.    
It's also possible to specify exact [coordinates](crop.md#coordinates) to start the crop instead of the gravity.

## Gravity

The gravity values are `north, northeast, east, southeast, south, southwest, west, northwest, center and centre`.

In this example we are cropping a 200x200 portion of the image at west

<code>https&#8203;:&#8203;//caravaggio.host/<strong>crop_200x200xwest</strong>/https&#8203;:&#8203;//goo.gl/Pe7YrK</code>

**Original** (width 640px)    
<img width="320" src="assets/example/girls.jpeg" />

**Result**     
<img width="200" src="assets/example/girls_crop_west.jpeg" />

## Coordinates

In this case you can specify `x`, `y`, `width` and `height` of the crop

<code>https&#8203;:&#8203;//caravaggio.host/<strong>crop_150x10x200x200</strong>/https&#8203;:&#8203;//goo.gl/Pe7YrK</code>

The image will be cropped at position x=150, y=10 and then a square of 200x200 pixel will be extracted

**Result**    

<img width="200" src="assets/example/girls_crop_coord.jpeg" />

