const image = require('./image');

module.exports = {
  convert: (url, options) => image.getImageHandler(url.toString())
    .then(pipeline => options.operations.reduce(
      (acc, [operation, params]) => {
        console.log(`Applying operation "${operation}" with parameters: ${params}`);
        if (!acc[operation]) {
          throw new Error(`Invalid operation: ${operation}`);
        }
        return acc[operation](params);
      },
      pipeline,
    ))
    .then(pipeline => pipeline.toBuffer()),
};
