module.exports = value => ({
  operations: [
    ['blur', [value && parseFloat(value, 10)]],
  ],
});
