
const persisted = {
  files: {},
  size: 0,
};

const BToMB = B => Math.round((B / 1024 / 1024) * 100) / 100;

const checkMemory = (limit, filename) => {
  if (limit && limit > 0) {
    const { size, files } = persisted;
    if (size > limit) {
      const first = Object.keys(files)[0];
      if (first !== filename) {
        delete persisted.files[first];
      }
    }
  }
};

const increaseSize = (length) => {
  persisted.size += BToMB(length);
};

module.exports = ({ limit } = { limit: 100 }) => ({
  flush: async () => {
    persisted.files = {};
    persisted.size = 0;
  },

  exists: async filename => !!persisted.files[filename],

  read: async filename => (persisted.files[filename]
    ? {
      type: 'buffer',
      buffer: persisted.files[filename],
    }
    : null),

  save: async (filename, buffer) => {
    persisted.files[filename] = buffer;
    increaseSize(buffer.length);
    checkMemory(limit, filename);
    return {
      type: 'buffer',
      buffer,
    };
  },
});
