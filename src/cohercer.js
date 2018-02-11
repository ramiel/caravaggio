/**
 * Create a set of chainable validators on values
 */
const numberValidators = (parsed, errorMessage) => {
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

    multipleOf: (divisor) => {
      if (parsed % divisor !== 0) {
        throw new Error(errorMessage);
      }
      return valuedValidators;
    },

    value: () => parsed,
  };
  return valuedValidators;
};

const stringValidators = (parsed, errorMessage) => {
  const valueValidators = {
    enum: (accept = []) => {
      if (accept.indexOf(parsed) === -1) {
        throw new Error(errorMessage);
      }
      return valueValidators;
    },
    match: (regex) => {
      if (!regex.test(parsed)) {
        throw new Error(errorMessage);
      }
      return valueValidators;
    },
    value: () => parsed,
  };
  return valueValidators;
};

const boolValidators = (parsed, errorMessage) => {
  const valueValidators = {
    isTrue: () => {
      if (parsed !== true) {
        throw new Error(errorMessage);
      }
      return valueValidators;
    },
    isFalse: () => {
      if (parsed !== false) {
        throw new Error(errorMessage);
      }
      return valueValidators;
    },
    value: () => parsed,
  };
  return valueValidators;
};

module.exports = (value, errorMessage = 'The value is in the wrong format') => {
  /**
   * Coherce a string to a typed value and return a set of validators on that value
  */
  const cohercer = {
    toNumber: () => {
      const res = value * 1;
      if (Number.isNaN(res)) {
        throw new Error(errorMessage);
      }
      return numberValidators(res, errorMessage);
    },

    toInt: (base = 10) => {
      const res = parseInt(value, base);
      if (Number.isNaN(res)) {
        throw new Error(errorMessage);
      }
      return numberValidators(res, errorMessage);
    },

    toFloat: (base = 10) => {
      const res = parseFloat(value, base);
      if (Number.isNaN(res)) {
        throw new Error(errorMessage);
      }
      return numberValidators(res, errorMessage);
    },

    toString: () => stringValidators(`${value}`, errorMessage),

    toBool: () => {
      const res = cohercer.toString(value)
        .enum(['true', 'false', 'undefined'])
        .value();
      return boolValidators(res === 'true', errorMessage);
    },
  };

  return cohercer;
};

