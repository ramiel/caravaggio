module.exports = (url, options) => pipeline => options.transformations.reduce(
  (acc, { /* name,  */operation, params }) => {
    console.log(`Applying transformation "${operation}" with parameters: ${params}`);
    if (!acc[operation]) {
      throw new Error(`Invalid transformation: ${operation}`);
    }
    return acc[operation](...params);
  },
  pipeline,
);
