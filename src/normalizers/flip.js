module.exports = value => ({
  transformations: [
    [!value || value.toLowerCase() === 'x' ? 'flop' : 'flip', [true]],
  ],
});
