const config = require('config');
const input = require('./input');
const transformations = require('./transformations');
const output = require('./output');
const Image = require('../image');

const image = Image(config);

const createPipeline = (url, options) => {
  let metadata = null;
  let sharp = null;

  const pipeline = {
    load: () => image.getImageHandler(url.toString())
      .then((loadedSharp) => {
        sharp = loadedSharp;
        return pipeline;
      }),

    getUrl: () => url,

    getOptions: () => options,

    getMetadata: () => {
      if (metadata) {
        return Promise.resolve(metadata);
      }
      return sharp.metadata()
        .then((data) => {
          metadata = data;
          return metadata;
        });
    },

    toBuffer: (...params) => sharp.toBuffer(...params),

    hasOperation: operation => sharp && !!sharp[operation],
    applyOperation: (operation, ...params) => {
      sharp[operation](...params);
      return pipeline;
    },
  };

  return pipeline;
};

module.exports = {
  convert: (url, options) => createPipeline(url, options)
    .load()
    .then(input)
    .then(transformations)
    .then(output)
    .then(pipeline => pipeline.toBuffer()),
};

