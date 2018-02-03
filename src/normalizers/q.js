const path = require('path');

const getOutputType = (url, options) => (options.o !== 'original'
  ? options.o
  : path.extname(url.pathname).slice(1));

const subOperationGenerator = value => (url, options) => {
  const type = getOutputType(url, options);
  switch (type) {
    case 'jpeg':
    case 'jpg':
      return [
        {
          name: 'q',
          operation: 'jpeg',
          params: [{ quality: value }],
        },
      ];
    case 'webp':
    case 'tiff':
      return [
        {
          name: 'q',
          operation: type,
          params: [{ quality: value }],
        },
      ];
    default:
      return [];
  }
};

module.exports = value => ({
  output: [
    {
      name: 'q',
      operation: subOperationGenerator(Math.min(100, Math.max(1, value * 1))),
      params: [],
    },
  ],
});
