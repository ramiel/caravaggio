module.exports = value => ({
  transformations: [
    [{
      name: 'blur',
      operation: 'blur',
      params: [value && parseFloat(value, 10)],
    }],
  ],
});
