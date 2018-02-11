module.exports = (value, errorMessage = 'The value is in the wrong format') => {
  /**
   * Create a set of chainable validators on values
   */
  const numberValidators = (parsed) => {
    const valuedValidators = {
      min: (min) => {
        if (parsed < min) {
          throw new Error(errorMessage);
        }
        return valuedValidators;
      },

      max: (max) => {
        if (parsed > max) {
          throw new Error(errorMessage);
        }
        return valuedValidators;
      },

      value: () => parsed,
    };
    return valuedValidators;
  };

  /**
   * Coherce a string to a typed value and return a set of validators on that value
  */
  const cohercer = {
    toNumber: () => {
      const res = value * 1;
      if (Number.isNaN(res)) {
        throw new Error(errorMessage);
      }
      return numberValidators(res);
    },

    toInt: (base = 10) => {
      const res = parseInt(value, base);
      if (Number.isNaN(res)) {
        throw new Error(errorMessage);
      }
      return numberValidators(res);
    },

    toFloat: (base = 10) => {
      const res = parseFloat(value, base);
      if (Number.isNaN(res)) {
        throw new Error(errorMessage);
      }
      return numberValidators(res);
    },
  };

  return cohercer;
};

