module.exports = sharp => async (width, height/* , ...modeParams */) => {
  const { width: iw, height: ih } = await sharp.metadata();
  if (iw < width && ih < height) {
    return sharp.resize(width, height, { fit: 'inside' });
  }
  return sharp;
};

