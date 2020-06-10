import memory from './memory';

describe('Memory persistor', () => {
  const opt = {};
  afterEach(() => memory(opt).flush?.());

  test('saves a buffer', async () => {
    const buf = Buffer.alloc(1024);
    const result = await memory(opt).save('afile.png', buf);
    expect(result).toHaveProperty('type', 'buffer');
    expect(result).toHaveProperty('data', buf);
  });

  test('returns null if a file is not saved', async () => {
    const result = await memory(opt).read('afile.png');
    expect(result).toBe(null);
  });

  test('tells if an element exists', async () => {
    const result = await memory(opt).has('afile.png');
    expect(result).toBe(false);
  });

  test('returns a previously saved file', async () => {
    const buf = Buffer.alloc(1024);
    const mem = memory(opt);
    await mem.save('afile.png', buf);
    const result = await mem.read('afile.png');

    expect(result).toHaveProperty('type', 'buffer');
    expect(result).toHaveProperty('data', buf);
  });

  test('drop an old file if the limit is reached', async () => {
    const buf = Buffer.alloc(512 * 1024);
    const buf2 = Buffer.alloc(1024 * 1024);
    const mem = memory({ limit: 1 });
    await mem.save('afile.png', buf);
    await mem.save('bfile.png', buf2);
    const result = await mem.read('afile.png');

    expect(result).toBeNull();
  });

  test('do not drop the last inserted file if the limit is reached', async () => {
    const buf = Buffer.alloc(512 * 1024);
    const buf2 = Buffer.alloc(1024 * 1024);
    const mem = memory({ limit: 1 });
    await mem.save('afile.png', buf);
    await mem.save('bfile.png', buf2);
    const result = await mem.read('bfile.png');

    expect(result).not.toBeNull();
  });

  test('do not drop the last inserted file if it is the only one and the limit is reached', async () => {
    const buf2 = Buffer.alloc(1400 * 1024);
    const mem = memory({ limit: 1 });
    await mem.save('bfile.png', buf2);
    const result = await mem.read('bfile.png');

    expect(result).not.toBeNull();
  });
});
