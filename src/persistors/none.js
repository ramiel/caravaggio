module.exports = () => ({
  exists: async () => false,

  read: async () => null,

  save: async (filename, buffer) => ({
    type: 'buffer',
    buffer,
  }),

});
