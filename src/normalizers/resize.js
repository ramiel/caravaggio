const cohercer = require('../cohercer');

const RESIZE_PATTERN = /^(\d+(.\d)?x\d+(.\d)?|\d+(.\d)?x?|x\d+(.\d)?)$/;

module.exports = (value) => {
  const values = cohercer(value, 'Resize parameter in in the wrong format')
    .toString()
    .match(RESIZE_PATTERN)
    .value()
    .split('x');

  const width = parseFloat(values[0], 10) || null;
  const height = parseFloat(values[1], 10) || null;

  if ((width && width < 1) || (height && height < 1)) {
    return {
      transformations: [
        {
          name: 'resize',
          operation: pipeline => pipeline.getMetadata()
            .then(metadata => [
              {
                name: 'resize',
                operation: 'resize',
                params: [
                  width && Math.round(width * metadata.width),
                  height && Math.round(height * metadata.height),
                ],
              },
            ]),
          params: [],
        },
      ],
    };
  }
  return {
    transformations: [
      {
        name: 'resize',
        operation: 'resize',
        params: [
          width && Math.round(width),
          height && Math.round(height),
        ],
      },
    ],
  };
};

