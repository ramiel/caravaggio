module.exports = (value) => {
  const [width, height] = value.split('x');
  return {
    transformations: [
      {
        name: 'resize',
        operation: 'resize',
        params: [
          (width && parseInt(width, 10)) || null,
          (height && parseInt(height, 10)) || null,
        ],
      },
    ],
  };
};

