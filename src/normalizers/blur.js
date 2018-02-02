module.exports = value => ({
  transformations: [
    ['blur', [value && parseFloat(value, 10)]],
  ],
});
