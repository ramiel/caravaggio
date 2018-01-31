
const persisted = {
  files: {},
  size: 0,
};

const checkMemory = (limit) => {
  if (limit && limit > 0) {
    const { size, files } = persisted;
    if (size > limit) {
      const first = Object.keys(files)[0];
      delete persisted.files[first];
    }
  }
};

const increaseSize = (length) => {
  const lengthInMb = Math.round((length / 1024) * 100) / 100;
  persisted.size += lengthInMb;
};

module.exports = ({ limit } = { limit: false }) => ({
  flush: () => {
    persisted.files = {};
    persisted.size = 0;
    return Promise.resolve();
  },

  exists: filename => Promise.resolve(!!persisted.files[filename]),

  read: filename => Promise.resolve(persisted.files[filename]
    ? {
      type: 'buffer',
      buffer: persisted.files[filename],
    }
    : null),


  save: (filename, buffer) => {
    persisted.files[filename] = buffer;
    increaseSize(buffer.length);
    checkMemory(limit);
    return Promise.resolve({
      type: 'buffer',
      buffer,
    });
  },
});
