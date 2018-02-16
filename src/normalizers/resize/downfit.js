module.exports = (/* pipeline */) => async (width, height/* , ...modeParams */) => {
  const operations = [
    {
      name: 'resize_downfit',
      operation: 'resize',
      params: [width, height],
    },
    {
      name: 'resize_downfit',
      operation: 'max',
      params: [],
    },
    {
      name: 'resize_downfit',
      operation: 'withoutEnlargement',
      params: [],
    },
  ];

  return operations;
};

