module.exports = value => ({
  operations: [
    [!value || value.toLowerCase() === 'x' ? 'flop' : 'flip', [true]],
  ],
});
