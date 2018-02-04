module.exports = {
  createPipeline: (url, options) => {
    let pipelineMethod;
    const pipeline = {
      getOptions: () => options,
      getUrl: () => url,
      getMock: () => pipelineMethod.mock,

      hasOperation: operation => operation !== 'notexist',
      applyOperation: (operation, ...params) => {
        pipelineMethod(...params);
        return pipeline;
      },
    };
    pipelineMethod = jest.fn(() => pipeline);
    return pipeline;
  },
};

