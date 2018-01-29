module.exports = value => [
  [!value || value.toLowerCase() === 'x' ? 'flop' : 'flip', [true]],
];
