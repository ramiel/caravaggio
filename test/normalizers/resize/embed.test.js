const embed = require('normalizers/resize/embed');
const sharp = require('../../mocks/sharp.mock');

describe('Embed', () => {
  const fn = embed(sharp);

  beforeEach(() => {
    sharp.mockClear();
  });

  test('embed the image', async () => {
    await fn(300, 300);
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      background: {
        r: 0, g: 0, b: 0, alpha: 1,
      },
    });
  });

  test('embed the image with gravity', async () => {
    await fn(300, 300, 'gn');
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      position: 'north',
      background: {
        r: 0, g: 0, b: 0, alpha: 1,
      },
    });
  });

  test('embed the image with background color', async () => {
    await fn(300, 300, 'b000000255');
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      background: {
        r: 0, g: 0, b: 255, alpha: 1,
      },
    });
  });

  test('embed the image with background color and gravity', async () => {
    await fn(300, 300, 'b000000255', 'gcenter');
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      position: 'center',
      background: {
        r: 0, g: 0, b: 255, alpha: 1,
      },
    });
  });

  test('embed the image with gravity and background color', async () => {
    await fn(300, 300, 'geast', 'b000000255');
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      position: 'east',
      background: {
        r: 0, g: 0, b: 255, alpha: 1,
      },
    });
  });

  test('embed the image with background color and alpha', async () => {
    await fn(300, 300, 'b000000255.5');
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      background: {
        r: 0, g: 0, b: 255, alpha: 0.5,
      },
    });
  });

  test('embed the image with background hexadecimal color', async () => {
    await fn(300, 300, 'b0000FF');
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      background: {
        r: 0, g: 0, b: 255, alpha: 1,
      },
    });
  });

  test('embed the image with background hexadecimal color and alpha', async () => {
    await fn(300, 300, 'b0000FF.9');
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      background: {
        r: 0, g: 0, b: 255, alpha: 0.9,
      },
    });
  });

  test('embed the image with gravity and background hexadecimal color', async () => {
    await fn(300, 300, 'ge', 'bFF0000');
    expect(sharp.resize).toHaveBeenCalledTimes(1);
    expect(sharp.resize).toHaveBeenCalledWith(300, 300, {
      fit: 'contain',
      position: 'east',
      background: {
        r: 255, g: 0, b: 0, alpha: 1,
      },
    });
  });

  test('throw if the color is not in the correct form', async () => {
    await expect(fn(300, 300, 'ge', 'bFFF')).rejects.toBeDefined();
  });

  test('throw if the gravity is not in the correct form', async () => {
    await expect(fn(300, 300, 'gsnorth')).rejects.toBeDefined();
  });
});
