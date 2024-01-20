// biome-ignore lint/suspicious/noExplicitAny: No need to be clear in the mock
const sharp: any = {
  blur: jest.fn(async () => sharp),
  extract: jest.fn(async () => sharp),
  flip: jest.fn(async () => sharp),
  flop: jest.fn(async () => sharp),
  composite: jest.fn(() => sharp),
  rotate: jest.fn(async () => sharp),
  resize: jest.fn(async () => sharp),
  jpeg: jest.fn(async () => sharp),
  png: jest.fn(async () => sharp),
  tiff: jest.fn(async () => sharp),
  webp: jest.fn(async () => sharp),
  raw: jest.fn(() => sharp),
  metadata: jest.fn(async () => ({ width: 640, height: 480, format: 'jpeg' })),
  toBuffer: jest.fn(async ({ resolveWithObject } = {}) => {
    const data = Buffer.from([]);
    return resolveWithObject
      ? {
          data,
          info: {
            channel: 3,
          },
        }
      : data;
  }),
  clone: jest.fn(() => sharp),
  flatten: jest.fn(() => sharp),
  joinChannel: jest.fn(() => sharp),
  toFormat: jest.fn(() => sharp),

  // mock only method
  sharpConstructor: () => sharp,
  mockClear: () => {
    sharp.blur.mockClear();
    sharp.extract.mockClear();
    sharp.flip.mockClear();
    sharp.flop.mockClear();
    sharp.composite.mockClear();
    sharp.rotate.mockClear();
    sharp.resize.mockClear();
    sharp.jpeg.mockClear();
    sharp.png.mockClear();
    sharp.tiff.mockClear();
    sharp.webp.mockClear();
    sharp.raw.mockClear();
    sharp.metadata.mockClear();
    sharp.toBuffer.mockClear();
    sharp.clone.mockClear();
    sharp.flatten.mockClear();
    sharp.joinChannel.mockClear();
    sharp.toFormat.mockClear();
  },
};

export default sharp;
