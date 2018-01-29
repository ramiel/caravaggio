module.exports = () => ({
  exists: Promise.resolve(false),

  read: () => Promise.resolve(null),

  save: (filename, buffer) => Promise.resolve({
    type: 'buffer',
    buffer,
  }),

});
