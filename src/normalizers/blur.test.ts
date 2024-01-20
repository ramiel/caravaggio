/* eslint-env jest */

import { ServerRequest } from 'microrouter';
import sharp from '../tests/mocks/sharp.mock';
import blur from './blur';

const req = {} as ServerRequest;

describe('Blur', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('blur returns a transformation', () => {
    expect(blur({ operation: 'blur', value: '10' })).toEqual(
      expect.objectContaining([
        {
          name: 'blur',
          op: expect.any(Function),
          params: [10],
        },
      ]),
    );
  });

  test('blur apply transformation', async () => {
    const [{ op }] = blur({ operation: 'blur', value: '10' });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.blur).toHaveBeenCalledTimes(1);
    expect(sharp.blur).toHaveBeenCalledWith(10);
  });

  test('throw if value is not valid', () => {
    expect(() => blur({ operation: 'blur', value: '-10' })).toThrow();
    expect(() => blur({ operation: 'blur', value: '10e6' })).toThrow();
  });
});
