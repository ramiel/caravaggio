const utils = {
  /**
   * Returns the desired output.
   * If an `o` option is specified is used. If it's not specified, or it's `original`,
   * the metadata are checked in the sharp pipeline
   */
  getOutputType: async (sharp, pipeline) => {
    const options = pipeline.getOptions();
    return options.o !== 'original'
      ? options.o
      : (await sharp.metadata()).format;
  },
};

module.exports = utils;
