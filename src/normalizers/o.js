const cohercer = require('../cohercer');
const { buildDocumentationLink } = require('../utils');

module.exports = (value) => {
  const format = cohercer(value, `Accepted values are "original", jpg", "jpeg", "png", "webp", "tiff".
See ${buildDocumentationLink('output.html')}
  `)
    .toString()
    .enum(['original', 'jpg', 'jpeg', 'png', 'webp', 'tiff'])
    .value()
    .toLowerCase();

  switch (format) {
    case 'jpg':
    case 'jpeg':
      return {
        o: format,
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
        o: format,
        output: [
          {
            name: 'o',
            operation: format,
            params: [],
          },
        ],
      };
    default:
      return {
        o: 'original',
      };
  }
};

