/* eslint-env jest */

import sharp from '../tests/mocks/sharp.mock';
import flip from './flip';
import { ServerRequest } from 'microrouter';

const req = {} as ServerRequest;

describe('Flip', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('the default value is horizontal', () => {
    expect(flip({ operation: 'flip', value: 'true' })).toEqual(
      expect.objectContaining([
        {
          name: 'flip',
          op: expect.any(Function),
          params: ['x'],
        },
      ])
    );
  });

  test('can flip horizontally', () => {
    expect(flip({ operation: 'flip', value: 'x' })).toEqual(
      expect.objectContaining([
        {
          name: 'flip',
          op: expect.any(Function),
          params: ['x'],
        },
      ])
    );
  });

  test('apply horizontal flip', async () => {
    const [{ op }] = flip({ operation: 'flip', value: 'x' });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.flop).toHaveBeenCalledTimes(1);
  });

  test('can flip vertically', () => {
    expect(flip({ operation: 'flip', value: 'y' })).toEqual(
      expect.objectContaining([
        {
          name: 'flip',
          op: expect.any(Function),
          params: ['y'],
        },
      ])
    );
  });

  test('apply vertical flip', async () => {
    const [{ op }] = flip({ operation: 'flip', value: 'y' });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.flip).toHaveBeenCalledTimes(1);
  });

  test('throw if an invalid value is passed', () => {
    expect(() => flip({ operation: 'flip', value: 'h' })).toThrow();
  });
});
