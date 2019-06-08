
const BToMB = B => Math.round((B / 1024 / 1024) * 100) / 100;

module.exports = ({ limit } = { limit: 100 }) => {
  const fileCache = new Map();
  let size = 0;

  const checkMemory = (filename) => {
    if (limit && limit > 0 && size > limit) {
      const next = fileCache.keys().next();
      if (!next.done) {
        const first = next.value;
        if (first !== filename) {
          fileCache.delete(first);
        }
      }
    }
  };

  const increaseSize = (length) => {
    size += BToMB(length);
  };

  return {
    flush: async () => {
      fileCache.clear();
      size = 0;
    },

    exists: async filename => fileCache.has(filename),

    read: async filename => (fileCache.has(filename)
      ? {
        type: 'buffer',
        buffer: fileCache.get(filename),
      }
      : null),

    save: async (filename, buffer) => {
      fileCache.set(filename, buffer);
      increaseSize(buffer.length);
      checkMemory(filename);
      return {
        type: 'buffer',
        buffer,
      };
    },
  };
};
