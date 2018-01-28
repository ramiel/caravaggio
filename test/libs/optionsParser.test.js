const { createCallStack } = require('../../src/libs/parser');

describe('option parser', () => {
  test('parse rotate option', () => {
    const options = 'rotate_90';
    const parsed = createCallStack(options);
    expect(parsed).toEqual([
      ['rotate', 90],
    ]);
  });
});
