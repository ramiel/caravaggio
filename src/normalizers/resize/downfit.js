module.exports = (/* pipeline */) => async (width, height/* , ...modeParams */) => {
  const operations = [
    {
      name: 'resize_downfit',
      operation: 'resize',
      params: [width, height, { fit: 'inside', withoutEnlargement: true }],
    },
  ];

  return operations;
};

