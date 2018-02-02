module.exports = (url, options) => pipeline => options.transformations.reduce(
  (acc, [transformation, params]) => {
    if (!acc[transformation]) {
      throw new Error(`Invalid transformation: ${transformation}`);
    }
    console.log(`Applying transformation "${transformation}" with parameters: ${params}`);
    return acc[transformation](...params);
  },
  pipeline,
);
