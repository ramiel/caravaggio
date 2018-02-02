module.exports = (url, options) => pipeline => options.output.reduce(
  (acc, [operation, params]) => {
    if (!acc[operation]) {
      throw new Error(`Invalid operation: ${operation}`);
    }
    console.log(`Applying output operation "${operation}" with parameters: ${params}`);
    return acc[operation](...params);
  },
  pipeline,
);

