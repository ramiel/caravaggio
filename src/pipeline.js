const image = require('./image');
const { createCallStack } = require('./parser');

module.exports = {
  convert: (url, options) => image.getImageHandler(url.toString())
    .then((pipeline) => {
      const callStack = createCallStack(options);
      return callStack.reduce(
        (acc, [operation, params]) => {
          console.log(`Applying operation "${operation}" with parameters: ${params}`);
          return acc[operation](params);
        },
        pipeline,
      );
    })
    .then(pipeline => pipeline.toBuffer()),
};
