const getOutputType = async pipeline => (pipeline.getOptions().o !== 'original'
  ? pipeline.getOptions().o
  : (await pipeline.getMetadata()).format);


module.exports = (value) => {
  const progressive = value === 'true';
  return {
    output: [
      {
        name: 'progressive',
        operation: async (pipeline) => {
          const format = await getOutputType(pipeline);
          switch (format) {
            case 'jpeg':
            case 'jpg':
              return [
                {
                  name: 'progressive',
                  operation: 'jpeg',
                  params: [{ progressive }],
                },
              ];
            case 'png':
              return [
                {
                  name: 'progressive',
                  operation: 'png',
                  params: [{ progressive }],
                },
              ];
            default:
              return [];
          }
        },
        params: [],
      },
    ],
  };
};

