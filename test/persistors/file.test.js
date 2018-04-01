const file = require('persistors/file');


describe('File persistor', () => {
  afterEach(() => file().flush());

  test('can be instantiated if no option is passed', () => {
    expect(() => file()).not.toThrow();
  });

  test('can be instantiated if empty option is passed', () => {
    expect(() => file({})).not.toThrow();
  });

  test('saves a buffer', async () => {
    const buf = Buffer.alloc(1024);
    const result = await file().save('afile.png', buf);
    expect(result).toHaveProperty('type', 'buffer');
    expect(result).toHaveProperty('buffer', buf);
  });

  test('returns null if a file is not saved', async () => {
    const result = await file().read('afile.png');
    expect(result).toBe(null);
  });

  test('tell if a file exists', async () => {
    const buf = Buffer.alloc(1024);
    await file().save('afile.png', buf);
    const result = await file().exists('afile.png');
    expect(result).toBe(true);
  });

  test('tell if a file not exists', async () => {
    const result = await file().exists('afile.png');
    expect(result).toBe(false);
  });

  test('returns a previously saved file', async () => {
    const buf = Buffer.alloc(1024);
    const mem = file();
    await mem.save('afile.png', buf);
    const result = await mem.read('afile.png');

    expect(result).toHaveProperty('type', 'buffer');
    expect(result).toHaveProperty('buffer', buf);
  });
});
