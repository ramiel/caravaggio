// const input = require('./input');
const transformations = require('./transformations');
const output = require('./output');
const Image = require('../image');


module.exports = (config) => {
  const image = Image(config);

  const createPipeline = (url, options) => {
    const pipeline = {
      load: () => image.getImageHandler(url.toString())
        .then(loadedSharp => loadedSharp),

      getUrl: () => url,

      getOptions: () => options,
    };

    return pipeline;
  };

  return {
    convert: (url, options) => {
      const pipeline = createPipeline(url, options);
      return pipeline.load()
        // .then(input)
        .then(transformations(pipeline))
        .then(output(pipeline))
        .then(result => result.toBuffer());
    },
  };
};

