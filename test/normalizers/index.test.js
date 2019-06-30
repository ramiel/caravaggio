const config = require('config');
const normalizerFactory = require('../../src/normalizers/');

jest.mock('../../src/logger');
const normalizer = normalizerFactory(config);

describe('Normalizer', () => {
  test('o is maintained', () => {
    const result = normalizer({
      o: 'original',
      operations: [['rotate', '90']],
      rawNormalizedOptions: 'rotate_90',
    });
    expect(result).toHaveProperty('o', 'original');
  });

  test('rawNormalizedOptions is maintained', () => {
    const result = normalizer({
      o: 'original',
      operations: [['rotate', '90']],
      rawNormalizedOptions: 'rotate_90',
    });
    expect(result).toHaveProperty('rawNormalizedOptions', 'rotate_90');
  });

  test('a transformation goes in the transformations', () => {
    const result = normalizer({
      o: 'original',
      operations: [['blur', '9']],
      rawNormalizedOptions: 'blur_9',
    });
    expect(result).toHaveProperty('transformations');
    expect(result.transformations).toBeInstanceOf(Array);
  });

  test('a the default operations are added if any', () => {
    config.defaultTransformations = [
      ['o', 'webp'],
    ];
    const nml = normalizerFactory(config);
    const result = nml({
      o: 'original',
      operations: [['blur', '9']],
      rawNormalizedOptions: 'blur_9',
    });
    expect(result.output).toHaveLength(1);
  });

  test('a the default operations is overwritten by one set by the user', () => {
    config.defaultTransformations = [
      ['o', 'webp'],
    ];
    const nml = normalizerFactory(config);
    const result = nml({
      o: 'png',
      operations: [['o', 'jpg']],
      rawNormalizedOptions: 'o_png',
    });
    expect(result.output).toHaveLength(1);
    expect(result.output[0]).toEqual({
      name: 'o',
      fn: expect.any(Function),
      params: ['jpg'],
    });
  });
});

