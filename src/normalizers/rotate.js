module.exports = value => ({
  transformations: [
    {
      name: 'rotate',
      operation: 'rotate',
      params: [value && value * 1],
    },
  ],
});

