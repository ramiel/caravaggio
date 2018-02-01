const normalizer = require('../../src/normalizers/');

describe('Normalizer', () => {
  test('o is maintained', () => {
    const result = normalizer({
      o: 'original',
      operations: ['rotate_90'],
      rawNormalizedOptions: 'rotate_90',
    });
    expect(result).toHaveProperty('o', 'original');
  });

  test('rawNormalizedOptions is maintained', () => {
    const result = normalizer({
      o: 'original',
      operations: ['rotate_90'],
      rawNormalizedOptions: 'rotate_90',
    });
    expect(result).toHaveProperty('rawNormalizedOptions', 'rotate_90');
  });
});

