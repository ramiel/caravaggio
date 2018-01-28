
const persisted = {};
module.exports = () => ({
  exists: filename => Promise.resolve(!!persisted[filename]),

  read: filename => Promise.resolve(persisted[filename]
    ? {
      type: 'buffer',
      buffer: persisted[filename],
    }
    : null),

  save: (filename, buffer) => {
    persisted[filename] = buffer;
    return Promise.resolve({
      type: 'buffer',
      buffer,
    });
  },
});
