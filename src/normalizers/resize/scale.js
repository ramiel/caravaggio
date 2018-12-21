module.exports = (/* pipeline */) => async (width, height, modeParams) => {
  const params = [width, height];
  if (modeParams === 'iar') {
    params.push({ fit: 'fill' });
  }
  const operations = [
    {
      name: 'resize',
      operation: 'resize',
      params,
    },
  ];
  return operations;
};

