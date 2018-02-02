const output = require('../../src/pipelines/output');

let pipelineMethod;
const pipeline = new Proxy({}, {
  get: (_, name) => (name === 'notexist' ? undefined : pipelineMethod),
});
pipelineMethod = jest.fn(() => pipeline);


describe('Output pipeline', () => {
  beforeEach(() => {
    pipeline.any.mockClear();
  });

  test('call an output operation', () => {
    output('url', { output: [{ name: 'op1', operation: 'op1', params: ['p1'] }] })(pipeline);
    expect(pipelineMethod.mock.calls).toHaveLength(1);
  });

  test('all the output operations are called', () => {
    const operations = [
      { name: 'op1', operation: 'op1', params: ['p1'] },
      { name: 'op2', operation: 'op2', params: ['p2'] },
      { name: 'op3', operation: 'op3', params: ['p3'] },
    ];
    output('url', { output: operations })(pipeline);
    expect(pipelineMethod.mock.calls).toHaveLength(3);
  });

  test('all the operations are called in order', () => {
    const operations = [
      { name: 'op1', operation: 'op1', params: ['p1'] },
      { name: 'op2', operation: 'op2', params: ['p2'] },
      { name: 'op3', operation: 'op3', params: ['p3'] },
    ];
    output('url', { output: operations })(pipeline);
    expect(pipelineMethod.mock.calls[0][0]).toBe('p1');
    expect(pipelineMethod.mock.calls[1][0]).toBe('p2');
    expect(pipelineMethod.mock.calls[2][0]).toBe('p3');
  });

  test('throw if an operation is undefined', () => {
    const call = () => {
      output('url', { output: [['notexist', ['p1']]] })(pipeline);
    };
    expect(call).toThrow();
  });

  test('the operations are called in the right order', () => {
    const operations = [
      { name: 'q', operation: 'q', params: [90] },
      { name: 'o', operation: 'o', params: ['jpeg'] },
    ];
    output('url', { output: operations })(pipeline);
    expect(pipelineMethod.mock.calls[0][0]).toBe('jpeg');
    expect(pipelineMethod.mock.calls[1][0]).toBe(90);
  });

  test('the operations are called in the right order (2)', () => {
    const operations = [
      { name: 'q', operation: 'q', params: [90] },
      { name: 'o', operation: 'o', params: ['jpeg'] },
      { name: 'q', operation: 'q', params: [180] },
    ];
    output('url', { output: operations })(pipeline);
    expect(pipelineMethod.mock.calls[0][0]).toBe('jpeg');
    expect(pipelineMethod.mock.calls[1][0]).toBe(90);
    expect(pipelineMethod.mock.calls[2][0]).toBe(180);
  });
});

