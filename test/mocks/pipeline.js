module.exports = {
  createPipeline: (url, options) => {
    let pipelineMethod;
    let metadata = {
      format: 'jpeg',
      width: 640,
      height: 480,
      space: 'rgb',
      channels: 3,
      depth: 'uchar',
    };
    const pipeline = {
      getOptions: () => options,
      getUrl: () => url,
      getMetadata: () => Promise.resolve(metadata),
      hasOperation: operation => operation !== 'notexist',
      applyOperation: (operation, ...params) => {
        pipelineMethod(...params);
        return pipeline;
      },
      // Mock methods only. These are not present in the original pipeline
      getMock: () => pipelineMethod.mock,
      setMetadata: (data) => {
        metadata = {
          ...metadata,
          ...data,
        };
      },
    };
    pipelineMethod = jest.fn(() => pipeline);
    return pipeline;
  },
};
