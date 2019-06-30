const output = require('../../src/pipelines/output');
const pipeline = require('../mocks/pipeline.mock');
const sharp = require('../mocks/sharp.mock');

jest.mock('../../src/logger');

describe('Output pipeline', () => {
  beforeEach(() => {
    pipeline.mockClear();
    sharp.mockClear();
  });

  test('call an output operation', async () => {
    const fn = jest.fn(async s => s);
    pipeline.getOptions.mockReturnValueOnce({ output: [{ name: 'op1', fn, params: ['p1'] }] });
    await output(pipeline)(sharp);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('all the output operations are called', async () => {
    const fn = jest.fn(async s => s);
    const operations = [
      { name: 'op1', fn, params: ['p1'] },
      { name: 'op2', fn, params: ['p2'] },
      { name: 'op3', fn, params: ['p3'] },
    ];
    pipeline.getOptions.mockReturnValueOnce({ output: operations });
    await output(pipeline)(sharp);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  test('all the operations are called in order', async () => {
    const fn = jest.fn(async s => s);
    const operations = [
      { name: 'op1', fn: () => fn(1), params: ['p1'] },
      { name: 'op2', fn: () => fn(2), params: ['p2'] },
      { name: 'op3', fn: () => fn(3), params: ['p3'] },
    ];
    pipeline.getOptions.mockReturnValueOnce({ output: operations });
    await output(pipeline)(sharp);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenNthCalledWith(1, 1);
    expect(fn).toHaveBeenNthCalledWith(2, 2);
    expect(fn).toHaveBeenNthCalledWith(3, 3);
  });

  test('throw if an operation is undefined', async () => {
    const fn = undefined;
    pipeline.getOptions.mockReturnValueOnce({ output: [{ name: 'op1', fn, params: ['p1'] }] });
    await expect(output(pipeline)(sharp)).rejects.toBeDefined();
  });

  test('the operations are called in the right order', async () => {
    const fn = jest.fn(async s => s);
    const operations = [
      { name: 'q', fn: () => fn('quality'), params: ['p1'] },
      { name: 'o', fn: () => fn('output'), params: ['p2'] },
    ];
    pipeline.getOptions.mockReturnValueOnce({ output: operations });
    await output(pipeline)(sharp);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(1, 'output');
    expect(fn).toHaveBeenNthCalledWith(2, 'quality');
  });

  test('the operations are called in the right order (2)', async () => {
    const fn = jest.fn(async s => s);
    const operations = [
      { name: 'q', fn: () => fn('quality 1'), params: ['p1'] },
      { name: 'o', fn: () => fn('output'), params: ['p2'] },
      { name: 'q', fn: () => fn('quality 2'), params: [180] },
    ];
    pipeline.getOptions.mockReturnValueOnce({ output: operations });
    await output(pipeline)(sharp);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenNthCalledWith(1, 'output');
    expect(fn).toHaveBeenNthCalledWith(2, 'quality 1');
    expect(fn).toHaveBeenNthCalledWith(3, 'quality 2');
  });
});

