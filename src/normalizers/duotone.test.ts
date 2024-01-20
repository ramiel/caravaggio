/* eslint-env jest */

import { ServerRequest } from 'microrouter';
import { Operation } from '.';
import sharp from '../tests/mocks/sharp.mock';
import duotone from './duotone';

const req = {} as ServerRequest;

jest.mock('sharp', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require('../tests/mocks/sharp.mock').default.sharpConstructor;
});

const getOutOp = (format: string): Operation[] => [
  {
    name: 'o',
    op: async ({ image }) => image,
    params: [format],
  },
];

describe('Duotone', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('Accept two colors', () => {
    expect(duotone({ operation: 'duotone', h: 'FFAA00', s: '1122DC' })).toEqual(
      expect.objectContaining([
        {
          name: 'duotone',
          op: expect.any(Function),
          params: ['FFAA00', '1122DC'],
        },
      ]),
    );
  });

  test('Accept two colors and the opacity', () => {
    expect(
      duotone({ operation: 'duotone', h: 'FFAA00', s: '1122DC', o: '0.8' }),
    ).toEqual(
      expect.objectContaining([
        {
          name: 'duotone',
          op: expect.any(Function),
          params: ['FFAA00', '1122DC', 0.8],
        },
      ]),
    );
  });

  test('apply duotone shift', async () => {
    const [{ op }] = duotone({
      operation: 'duotone',
      h: 'FFAA00',
      s: '1122DC',
    });
    await op({
      image: sharp,
      otherOps: getOutOp('png'),
      req,
    });
    expect(sharp.toBuffer).toHaveBeenCalledTimes(1);
    expect(sharp.toFormat).toHaveBeenCalledTimes(1);
    expect(sharp.toFormat).toHaveBeenCalledWith('png');
  });

  test('apply duotone shift with opacity', async () => {
    const [{ op }] = duotone({
      operation: 'duotone',
      h: 'FFAA00',
      s: '1122DC',
      o: '0.5',
    });
    await op({
      image: sharp,
      otherOps: getOutOp('png'),
      req,
    });
    expect(sharp.toBuffer).toHaveBeenCalledTimes(3);
  });

  test('use a format even if output is "original"', async () => {
    sharp.metadata.mockResolvedValueOnce({ format: 'webp' });
    const [{ op }] = duotone({
      operation: 'duotone',
      h: 'FFAA00',
      s: '1122DC',
    });
    await op({
      image: sharp,
      otherOps: getOutOp('original'),
      req,
    });
    expect(sharp.toFormat).toHaveBeenCalledTimes(1);
    expect(sharp.toFormat).toHaveBeenCalledWith('webp');
  });

  test('throw if one of the colour is not valid', () => {
    expect(() =>
      duotone({
        operation: 'duotone',
        h: 'FFAA00',
        s: 'hello',
      }),
    ).toThrow();
  });

  test('throw if one of the colour is missing', () => {
    expect(() =>
      duotone({
        operation: 'duotone',
        h: 'FFAA00',
        s: '',
      }),
    ).toThrow();
  });
});
