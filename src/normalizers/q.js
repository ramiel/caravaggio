const normalizeQ = value => Math.round((value * 80) / 100);

const getOutputType = async pipeline => (pipeline.getOptions().o !== 'original'
  ? pipeline.getOptions().o
  : (await pipeline.getMetadata()).format);

const subOperationGenerator = value => async (pipeline) => {
  const format = await getOutputType(pipeline);
  switch (format) {
    case 'jpeg':
    case 'jpg':
      return [
        {
          name: 'q',
          operation: 'jpeg',
          params: [{ quality: normalizeQ(value) }],
        },
      ];
    case 'webp':
    case 'tiff':
      return [
        {
          name: 'q',
          operation: format,
          params: [{ quality: normalizeQ(value) }],
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
