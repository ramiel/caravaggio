const memory = require('../../src/persistors/memory');


describe('Memory persistor', () => {
  afterEach(() => memory().flush());

  test('saves a buffer', async () => {
    const buf = Buffer.alloc(1024);
    const result = await memory().save('afile.png', buf);
    expect(result).toHaveProperty('type', 'buffer');
    expect(result).toHaveProperty('buffer', buf);
  });

  test('returns null if a file is not saved', async () => {
    const result = await memory().read('afile.png');
    expect(result).toBe(null);
  });

  test('returns a previously saved file', async () => {
    const buf = Buffer.alloc(1024);
    const mem = memory();
    await mem.save('afile.png', buf);
    const result = await mem.read('afile.png');

    expect(result).toHaveProperty('type', 'buffer');
    expect(result).toHaveProperty('buffer', buf);
  });

  test('drop an old file if the limit is reached', async () => {
    const buf = Buffer.alloc(512);
    const buf2 = Buffer.alloc(1024);
    const mem = memory({ limit: 1 });
    await mem.save('afile.png', buf);
    await mem.save('bfile.png', buf2);
    const result = await mem.read('afile.png');

    expect(result).toBeNull();
  });

  test('do not drop the last inserted file if the limit is reached', async () => {
    const buf = Buffer.alloc(512);
    const buf2 = Buffer.alloc(1024);
    const mem = memory({ limit: 1 });
    await mem.save('afile.png', buf);
    await mem.save('bfile.png', buf2);
    const result = await mem.read('bfile.png');

    expect(result).not.toBeNull();
  });
});
