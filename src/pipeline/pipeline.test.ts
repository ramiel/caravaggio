import sharp from 'sharp';
import { strictestCacheStrategy } from '.';
import { Operation } from '../normalizers';

const fakeOperation = async () => {
  return sharp();
};

/* eslint-env jest */
describe('Pipeline test', () => {
  describe('strictestCacheStrategy', () => {
    test('given a series of public operations, return public', () => {
      const operations: Array<Operation> = [
        {
          name: 'first',
          op: fakeOperation,
          params: [],
          cacheStrategy: 'public',
        },
        {
          name: 'second',
          op: fakeOperation,
          params: [],
          cacheStrategy: 'public',
        },
      ];
      const result = strictestCacheStrategy(operations);
      expect(result).toBe('public');
    });

    test('skip wins over public', () => {
      const operations: Array<Operation> = [
        {
          name: 'first',
          op: fakeOperation,
          params: [],
          cacheStrategy: 'skip',
        },
        {
          name: 'second',
          op: fakeOperation,
          params: [],
          cacheStrategy: 'public',
        },
      ];
      const result = strictestCacheStrategy(operations);
      expect(result).toBe('skip');
    });

    test('private wins over public', () => {
      const operations: Array<Operation> = [
        {
          name: 'first',
          op: fakeOperation,
          params: [],
          cacheStrategy: 'public',
        },
        {
          name: 'second',
          op: fakeOperation,
          params: [],
          cacheStrategy: 'private',
        },
      ];
      const result = strictestCacheStrategy(operations);
      expect(result).toBe('private');
    });

    test('skip wins over private', () => {
      const operations: Array<Operation> = [
        {
          name: 'first',
          op: fakeOperation,
          params: [],
          cacheStrategy: 'public',
        },
        {
          name: 'third',
          op: fakeOperation,
          params: [],
          cacheStrategy: 'skip',
        },
        {
          name: 'second',
          op: fakeOperation,
          params: [],
          cacheStrategy: 'private',
        },
      ];
      const result = strictestCacheStrategy(operations);
      expect(result).toBe('skip');
    });
  });
});
