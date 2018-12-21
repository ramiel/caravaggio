module.exports = (/* pipeline */) => async (width, height/* , modeParams */) => {
  const operations = [
    {
      name: 'resize_fit',
      operation: 'resize',
      params: [width, height, { fit: 'inside' }],
    },
  ];

  return operations;
};

