import { getGravityFromParameter } from './gravity';

describe('gravity', () => {
  const gravityValues = [
    'c',
    'n',
    'ne',
    'nw',
    'e',
    'w',
    's',
    'se',
    'sw',
    'center',
    'centre',
    'north',
    'northeast',
    'northwest',
    'east',
    'west',
    'south',
    'southeast',
    'southwest',
  ];

  for (const value of gravityValues) {
    test(`"${value}" is accepted as gravity`, () => {
      expect(() => {
        getGravityFromParameter(value);
      }).not.toThrow();
    });
  }
  for (const value of gravityValues) {
    test(`"g${value}" is accepted as gravity`, () => {
      expect(() => {
        getGravityFromParameter(`g${value}`);
      }).not.toThrow();
    });
  }

  test('an unknown value is not accepted', () => {
    expect(() => {
      getGravityFromParameter('saturn');
    }).toThrow();
  });

  test('"auto" is not accepted', () => {
    expect(() => {
      getGravityFromParameter('auto');
    }).toThrow();
  });

  test('"auto" is accepted if "acceptAuto" is passed as option', () => {
    expect(() => {
      getGravityFromParameter('auto', { acceptAuto: true });
    }).not.toThrow();
  });

  test('"gauto" is accepted if "acceptAuto" is passed as option', () => {
    expect(() => {
      getGravityFromParameter('gauto', { acceptAuto: true });
    }).not.toThrow();
  });
});
