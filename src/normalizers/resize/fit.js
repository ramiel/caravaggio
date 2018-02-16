module.exports = (/* pipeline */) => async (width, height/* , modeParams */) => {
  const operations = [
    {
      name: 'resize_fit',
      operation: 'resize',
      params: [width, height],
    },
    {
      name: 'resize_fit',
      operation: 'max',
      params: [],
    },
  ];

  return operations;
};

