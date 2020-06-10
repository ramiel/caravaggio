/* eslint-env jest */

import sharp from '../tests/mocks/sharp.mock';
import extract from './extract';
import { ServerRequest } from 'microrouter';

const req = {} as ServerRequest;

describe('Extract', () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  test('extract the desired sub image', () => {
    const operations = extract({
      operation: 'ex',
      x: '95',
      y: '35',
      w: '100',
      h: '200',
    });

    expect(operations).toEqual([
      {
        name: 'extract',
        op: expect.any(Function),
        params: [
          {
            left: 95,
            top: 35,
            width: 100,
            height: 200,
          },
        ],
      },
    ]);
  });

  test('apply extraction', async () => {
    const [{ op }] = extract({
      operation: 'ex',
      x: '95',
      y: '35',
      w: '100',
      h: '200',
    });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.extract).toHaveBeenCalledTimes(1);
    expect(sharp.extract).toHaveBeenCalledWith({
      left: 95,
      top: 35,
      width: 100,
      height: 200,
    });
  });

  test('all parameters can be expressed as percentage', async () => {
    const operations = extract({
      operation: 'ex',
      x: '0.1',
      y: '0.1',
      w: '0.5',
      h: '0.5',
    });
    expect(operations).toEqual([
      {
        name: 'extract',
        op: expect.any(Function),
        params: [
          {
            left: 0.1,
            top: 0.1,
            width: 0.5,
            height: 0.5,
          },
        ],
      },
    ]);
  });

  test('apply extraction with percentage', async () => {
    const [{ op }] = extract({
      operation: 'ex',
      x: '0.1',
      y: '0.1',
      w: '0.5',
      h: '0.5',
    });
    await op({ image: sharp, otherOps: [], req });
    expect(sharp.extract).toHaveBeenCalledTimes(1);
    expect(sharp.extract).toHaveBeenCalledWith({
      left: 64,
      top: 48,
      width: 320,
      height: 240,
    });
  });

  test('a missing parameter throws an error', () => {
    expect(() =>
      extract({
        operation: 'ex',
        x: '0.1',
        y: '0.1',
        w: '0.5',
        h: '',
      })
    ).toThrow();
  });

  test('a wrong format parameter throws an error', () => {
    expect(() =>
      extract({
        operation: 'ex',
        x: '0.1',
        y: '0.1',
        w: 'aba',
        h: '0.5',
      })
    ).toThrow();
  });
});
