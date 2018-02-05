const output = require('../../src/pipelines/output');
const { createPipeline } = require('../mocks/pipeline');

describe('Output pipeline', () => {
  test('call an output operation', async () => {
    const pipeline = createPipeline('url', { output: [{ name: 'op1', operation: 'op1', params: ['p1'] }] });
    await output(pipeline);
    expect(pipeline.getMock().calls).toHaveLength(1);
  });

  test('all the output operations are called', async () => {
    const operations = [
      { name: 'op1', operation: 'op1', params: ['p1'] },
      { name: 'op2', operation: 'op2', params: ['p2'] },
      { name: 'op3', operation: 'op3', params: ['p3'] },
    ];
    const pipeline = createPipeline('url', { output: operations });
    await output(pipeline);
    expect(pipeline.getMock().calls).toHaveLength(3);
  });

  test('all the operations are called in order', async () => {
    const operations = [
      { name: 'op1', operation: 'op1', params: ['p1'] },
      { name: 'op2', operation: 'op2', params: ['p2'] },
      { name: 'op3', operation: 'op3', params: ['p3'] },
    ];
    const pipeline = createPipeline('url', { output: operations });
    await output(pipeline);
    expect(pipeline.getMock().calls[0][0]).toBe('p1');
    expect(pipeline.getMock().calls[1][0]).toBe('p2');
    expect(pipeline.getMock().calls[2][0]).toBe('p3');
  });

  test('throw if an operation is undefined', () => {
    const pipeline = createPipeline('url', {
      output: [{
        name: 'op1',
        operation: 'notexist',
        params: [],
      }],
    });
    expect(output(pipeline)).rejects.toBeDefined();
  });

  test('the operations are called in the right order', async () => {
    const operations = [
      { name: 'q', operation: 'q', params: [90] },
      { name: 'o', operation: 'o', params: ['jpeg'] },
    ];
    const pipeline = createPipeline('url', { output: operations });
    await output(pipeline);
    expect(pipeline.getMock().calls[0][0]).toBe('jpeg');
    expect(pipeline.getMock().calls[1][0]).toBe(90);
  });

  test('the operations are called in the right order (2)', async () => {
    const operations = [
      { name: 'q', operation: 'q', params: [90] },
      { name: 'o', operation: 'o', params: ['jpeg'] },
      { name: 'q', operation: 'q', params: [180] },
    ];
    const pipeline = createPipeline('url', { output: operations });
    await output(pipeline);
    expect(pipeline.getMock().calls[0][0]).toBe('jpeg');
    expect(pipeline.getMock().calls[1][0]).toBe(90);
    expect(pipeline.getMock().calls[2][0]).toBe(180);
  });
});

