import none from './none';

describe('None persistor', () => {
  const opt = {};

  test('saves a buffer', async () => {
    const buf = Buffer.alloc(1024);
    const result = await none(opt).save('afile.png', buf);
    expect(result).toHaveProperty('type', 'buffer');
    expect(result).toHaveProperty('data', buf);
  });

  test('returns null if a file is not saved', async () => {
    const result = await none(opt).read('afile.png');
    expect(result).toBe(null);
  });

  test('returns null for a previously saved file', async () => {
    const buf = Buffer.alloc(1024);
    const mem = none(opt);
    await mem.save('afile.png', buf);
    const result = await mem.read('afile.png');

    expect(result).toBe(null);
  });
});
