const cohercer = require('../cohercer');

module.exports = (value) => {
  const format = cohercer(value, 'Accepted values are "original", jpg", "jpeg", "png", "webp", "tiff".', 'output.html')
    .toString()
    .enum(['original', 'jpg', 'jpeg', 'png', 'webp', 'tiff'])
    .value()
    .toLowerCase();

  let fn;

  switch (format) {
    case 'jpg':
    case 'jpeg':
      fn = async sharp => sharp.jpeg();
      break;
    case 'png':
    case 'webp':
    case 'tiff':
      fn = async sharp => sharp[format]();
      break;
    default:
      return {};
  }

  return {
    o: format,
    output: [{
      name: 'o',
      fn,
      params: [format],
    }],
  };
};

