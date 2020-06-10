/* eslint-env jest */

import operationParser from './operationParser';

describe('Operation parser', () => {
  test('given no operations, return no operations', () => {
    const result = operationParser('/');
    expect(result).toEqual([]);
  });

  test('one operation with one value', () => {
    const result = operationParser('/o:jpeg');
    expect(result).toEqual([{ operation: 'o', value: 'jpeg' }]);
  });

  test('one operation with no value, the value is true', () => {
    const result = operationParser('/progressive');
    expect(result).toEqual([{ operation: 'progressive', value: 'true' }]);
  });

  test('one operation with one named parameter', () => {
    const result = operationParser('/rs,s:200x300');
    expect(result).toEqual([{ operation: 'rs', s: '200x300' }]);
  });

  test('one operation with one named parameter and a basic value, si forbidden', () => {
    expect(() => operationParser('/rs:1,s:200x300')).toThrowError(
      '"rs:1" is invalid'
    );
  });

  test('one operation with one named parameter and no value (default to true)', () => {
    const result = operationParser('/rs,iar');
    expect(result).toEqual([{ operation: 'rs', iar: 'true' }]);
  });

  test('one operation with more named parameter', () => {
    const result = operationParser('/rs,s:200x300,m:scale');
    expect(result).toEqual([{ operation: 'rs', s: '200x300', m: 'scale' }]);
  });

  test('a parameter cannot be named "operation"', () => {
    expect(() => operationParser('/rs,operation:scale')).toThrowError(
      'An operation cannot have a property called "operation"'
    );
  });

  test('one operation with a  parameter that is an url', () => {
    const result = operationParser(
      `/overlay,url:${encodeURIComponent('http://an_url.com')}`
    );
    expect(result).toEqual([
      { operation: 'overlay', url: 'http://an_url.com' },
    ]);
  });

  test('one operation with a  parameter that is an url and other paramenters', () => {
    const result = operationParser(
      `/overlay,url:${encodeURIComponent('http://an_url.com')},watermark`
    );
    expect(result).toEqual([
      { operation: 'overlay', url: 'http://an_url.com', watermark: 'true' },
    ]);
  });

  test('multiple operations', () => {
    const result = operationParser(
      `/rs,s:200x300,m:scale/overlay,url:${encodeURIComponent(
        'http://an_url.com'
      )}/progressive/o:jpeg/blur,auto`
    );
    expect(result).toEqual([
      {
        operation: 'rs',
        s: '200x300',
        m: 'scale',
      },
      {
        operation: 'overlay',
        url: 'http://an_url.com',
      },
      {
        operation: 'progressive',
        value: 'true',
      },
      {
        operation: 'o',
        value: 'jpeg',
      },
      {
        operation: 'blur',
        auto: 'true',
      },
    ]);
  });
});
