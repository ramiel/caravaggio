
const persisted = {};
module.exports = () => ({
  exists: filename => Promise.resolve(!!persisted[filename]),

  read: (filename) => {
    console.log(`checking file ${filename}`);
    return Promise.resolve(persisted[filename]
      ? {
        type: 'buffer',
        buffer: persisted[filename],
      }
      : null);
  },


  save: (filename, buffer) => {
    persisted[filename] = buffer;
    return Promise.resolve({
      type: 'buffer',
      buffer,
    });
  },
});
