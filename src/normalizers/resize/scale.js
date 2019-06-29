module.exports = sharp => async (width, height, modeParams) => {
  const params = [width, height];
  if (modeParams === 'iar') {
    params.push({ fit: 'fill' });
  }
  return sharp.resize(...params);
};

