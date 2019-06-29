const sharp = {
  blur: jest.fn(async () => sharp),
  extract: jest.fn(async () => sharp),
  flip: jest.fn(async () => sharp),
  flop: jest.fn(async () => sharp),
  overlayWith: jest.fn(async () => sharp),
  rotate: jest.fn(async () => sharp),
  resize: jest.fn(async () => sharp),
  jpeg: jest.fn(async () => sharp),
  png: jest.fn(async () => sharp),
  tiff: jest.fn(async () => sharp),
  webp: jest.fn(async () => sharp),
  metadata: jest.fn(async () => ({ width: 640, height: 480, format: 'jpeg' })),

  // mock only method
  mockClear: () => {
    sharp.blur.mockClear();
    sharp.extract.mockClear();
    sharp.flip.mockClear();
    sharp.flop.mockClear();
    sharp.overlayWith.mockClear();
    sharp.rotate.mockClear();
    sharp.resize.mockClear();
    sharp.jpeg.mockClear();
    sharp.png.mockClear();
    sharp.webp.mockClear();
    sharp.tiff.mockClear();
    sharp.metadata.mockClear();
  },
};

module.exports = sharp;
