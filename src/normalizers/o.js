module.exports = (value) => {
  if (value === 'original') {
    return {
      o: 'original',
    };
  }
  switch (value) {
    case 'jpg':
    case 'jpeg':
      return {
        o: value,
        output: [
          {
            name: 'o',
            operation: 'jpeg',
            params: [],
          },
        ],
      };
    case 'png':
    case 'webp':
    case 'tiff':
      return {
        o: value,
        output: [
          {
            name: 'o',
            operation: value,
            params: [],
          },
        ],
      };
    default:
      throw new Error(`Format not supported ${value}`);
  }
};

