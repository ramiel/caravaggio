const file = require('persistors/file');
const fs = require('fs-extra');

jest.mock('../../src/logger');
jest.mock('fs-extra', () => {
  let files = {};
  const implementation = {
    access: jest.fn(async () => null),
    readFile: jest.fn(async filename => files[filename]),
    outputFile: jest.fn(async (filename, content) => { files[filename] = content; }),
    emptyDir: jest.fn(async () => { files = {}; }),
    constants: {
      R_OK: 1,
    },

    mockClear: () => {
      implementation.access.mockClear();
      implementation.readFile.mockClear();
      implementation.outputFile.mockClear();
      implementation.emptyDir.mockClear();
    },
  };
  return implementation;
});


describe('File persistor', () => {
  beforeEach(() => {
    fs.mockClear();
  });

  afterEach(async () => file().flush());

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
    fs.readFile.mockImplementationOnce(async () => {
      const error = new Error();
      error.code = 'ENOENT';
      throw error;
    });
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
    fs.access.mockImplementationOnce(async () => { throw new Error(); });
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

  test('returns the buffer before saving the file (returns even if failing) [INVALID TEST]', async () => {
    fs.outputFile.mockImplementationOnce(async () => { throw new Error(); });
    const buf = Buffer.alloc(1024);
    const result = await file().save('afile.png', buf);
    expect(result).toHaveProperty('type', 'buffer');
    expect(result).toHaveProperty('buffer', buf);
  });
});
