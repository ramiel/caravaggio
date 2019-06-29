const utils = {
  getOutputType: async (sharp, pipeline) => {
    const options = pipeline.getOptions();
    return options.o !== 'original'
      ? options.o
      : (await sharp.metadata()).format;
  },
};

module.exports = utils;
