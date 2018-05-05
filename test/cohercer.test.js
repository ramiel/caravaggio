const coehercer = require('cohercer');

describe('Cohercer', () => {
  describe('generic behavior', () => {
    test('a validator is returned', () => {
      const res = coehercer('Caravaggio')
        .toString();
      expect(res).toHaveProperty('value', expect.any(Function));
    });
  });

  describe('cohercing', () => {
    describe('Strings', () => {
      test('a string become a string', () => {
        const res = coehercer('Caravaggio')
          .toString()
          .value();
        expect(res).toBe('Caravaggio');
      });
    });

    describe('Floats', () => {
      test('get a flot from an int', () => {
        const res = coehercer(10)
          .toFloat()
          .value();
        expect(res).toBe(10.0);
      });

      test('get a flot from float', () => {
        const res = coehercer(11.5)
          .toFloat()
          .value();
        expect(res).toBe(11.5);
      });

      test('get a flot from a string', () => {
        const res = coehercer('12.5')
          .toFloat()
          .value();
        expect(res).toBe(12.5);
      });

      test('an error is thrown if cannot convert the value', () => {
        expect(() => {
          coehercer(Function).toFloat();
        }).toThrow();
      });
    });
  });

  describe('Validating', () => {
    describe('Strings', () => {
      test('enum throws if the value is not in the list', () => {
        const value = coehercer('Caravaggio').toString();
        expect(() => value.enum(['proxy', 'image'])).toThrow();
      });

      test('enum throws if the value is not in the empty list', () => {
        const value = coehercer('Caravaggio').toString();
        expect(value.enum).toThrow();
      });
    });

    describe('Booleans', () => {
      test('check if is true', () => {
        const value = coehercer(true).toBool();
        expect(value.isTrue).not.toThrow();
      });

      test('check if is true and fails if not', () => {
        const value = coehercer(false).toBool();
        expect(value.isTrue).toThrow();
      });

      test('check if is false', () => {
        const value = coehercer(false).toBool();
        expect(value.isFalse).not.toThrow();
      });

      test('check if is false and fails if not', () => {
        const value = coehercer(true).toBool();
        expect(value.isFalse).toThrow();
      });
    });
  });
});
