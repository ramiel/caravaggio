const pipeline = {
  getOptions: jest.fn(() => ({ o: 'original' })),

  mockClear: () => {
    pipeline.getOptions.mockClear();
  },
};

module.exports = pipeline;
