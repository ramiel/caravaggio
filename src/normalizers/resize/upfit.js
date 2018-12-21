module.exports = pipeline => async (width, height/* , ...modeParams */) => {
  const { width: iw, height: ih } = await pipeline.getMetadata();
  if (iw < width && ih < height) {
    return [
      {
        name: 'resize_upfit',
        operation: 'resize',
        params: [width, height, { fit: 'inside' }],
      },
    ];
  }
  return [];
};

