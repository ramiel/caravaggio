module.exports = value => ({
  transformations: [
    {
      name: 'flip',
      operation: !value || value.toLowerCase() === 'x' ? 'flop' : 'flip',
      params: [true],
    },
  ],
});
