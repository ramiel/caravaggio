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
          ['jpeg', []],
        ],
      };
    case 'png':
    case 'webp':
    case 'tiff':
      return {
        o: value,
        output: [
          [value, []],
        ],
      };
    default:
      throw new Error(`Format not supported ${value}`);
  }
};

