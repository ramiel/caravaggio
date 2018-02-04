module.exports = (value) => {
  const values = value.split('x');
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

