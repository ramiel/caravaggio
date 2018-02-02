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

  test('a transformation goes in the transformations', () => {
    const result = normalizer({
      o: 'original',
      operations: ['blur_9'],
      rawNormalizedOptions: 'rotate_90',
    });
    expect(result).toHaveProperty('transformations');
    expect(result.transformations).toBeInstanceOf(Array);
  });
});

