const optionsParser = require('../../src/libs/optionsParser');

describe('option parser', () => {
  test('parse rotate option', () => {
    const options = 'rotate_90';
    const parsed = optionsParser(options);
    expect(parsed).toEqual([
      ['rotate', 90],
    ]);
  });
});
