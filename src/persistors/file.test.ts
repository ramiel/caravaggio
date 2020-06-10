/* eslint-env jest */
import file from './file';
import fs from 'fs-extra';

const mockedFs = (fs as unknown) as jest.Mock<typeof fs>;

jest.mock('../logger', () => ({
  getMainLogger: () => ({
    error: () => {
      // do nothing
    },
  }),
}));
jest.mock('fs-extra', () => {
  let files: { [key: string]: unknown } = {};
  const implementation = {
    access: jest.fn(async () => null),
    readFile: jest.fn(async (filename) => files[filename]),
    outputFile: jest.fn(async (filename, content) => {
      files[filename] = content;
    }),
    emptyDir: jest.fn(async () => {
      files = {};
    }),
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
  const opt = { basePath: '/' };
  beforeEach(() => {
    (mockedFs as jest.Mock).mockClear();
  });

  afterEach(async () => file(opt).flush?.());

  test('can be instantiated if no option is passed', () => {
    expect(() => file(opt)).not.toThrow();
  });

  test('can be instantiated if empty option is passed', () => {
    expect(() => file(opt)).not.toThrow();
  });

  test('saves a buffer', async () => {
    const buf = Buffer.alloc(1024);
    const result = await file(opt).save('afile.png', buf);
    expect(result).toHaveProperty('type', 'buffer');
    expect(result).toHaveProperty('data', buf);
  });

  test('returns null if a file is not saved', async () => {
    ((mockedFs as unknown) as any).readFile.mockImplementationOnce(async () => {
      const error: any = new Error();
      error.code = 'ENOENT';
      throw error;
    });
    const result = await file(opt).read('afile.png');
    expect(result).toBe(null);
  });

  test('tell if a file exists', async () => {
    const buf = Buffer.alloc(1024);
    await file(opt).save('afile.png', buf);
    const result = await file(opt).has('afile.png');
    expect(result).toBe(true);
  });

  test('tell if a file not exists', async () => {
    ((mockedFs as unknown) as any).access.mockImplementationOnce(async () => {
      throw new Error();
    });
    const result = await file(opt).has('afile.png');
    expect(result).toBe(false);
  });

  test('returns a previously saved file', async () => {
    const buf = Buffer.alloc(1024);
    const mem = file(opt);
    await mem.save('afile.png', buf);
    const result = await mem.read('afile.png');

    expect(result).toHaveProperty('type', 'buffer');
    expect(result).toHaveProperty('data', buf);
  });

  test('returns the buffer before saving the file (returns even if failing) [INVALID TEST]', async () => {
    (mockedFs as any).outputFile.mockImplementationOnce(async () => {
      throw new Error();
    });
    const buf = Buffer.alloc(1024);
    const result = await file(opt).save('afile.png', buf);
    expect(result).toHaveProperty('type', 'buffer');
    expect(result).toHaveProperty('data', buf);
  });
});
