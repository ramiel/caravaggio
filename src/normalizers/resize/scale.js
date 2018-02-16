module.exports = (/* pipeline */) => async (width, height, modeParams) => {
  const operations = [
    {
      name: 'resize',
      operation: 'resize',
      params: [
        width,
        height,
      ],
    },
  ];
  if (modeParams === 'iar') {
    operations.push({
      name: 'resize',
      operation: 'ignoreAspectRatio',
      params: [],
    });
  }
  return operations;
};

