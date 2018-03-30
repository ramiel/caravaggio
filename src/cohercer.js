const BadRequestError = require('./errors/BadRequestError');

/**
 * Create a set of chainable validators on values
 */
const numberValidators = (parsed, errorMessage, docUri) => {
  const valuedValidators = {
    min: (min) => {
      if (parsed < min) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return valuedValidators;
    },

    max: (max) => {
      if (parsed > max) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return valuedValidators;
    },

    multipleOf: (divisor) => {
      if (parsed % divisor !== 0) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return valuedValidators;
    },

    value: () => parsed,
  };
  return valuedValidators;
};

const stringValidators = (parsed, errorMessage, docUri) => {
  const valueValidators = {
    enum: (accept = []) => {
      if (accept.indexOf(parsed) === -1) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return valueValidators;
    },
    match: (regex) => {
      if (!regex.test(parsed)) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return valueValidators;
    },
    value: () => parsed,
  };
  return valueValidators;
};

const boolValidators = (parsed, errorMessage, docUri) => {
  const valueValidators = {
    isTrue: () => {
      if (parsed !== true) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return valueValidators;
    },
    isFalse: () => {
      if (parsed !== false) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return valueValidators;
    },
    value: () => parsed,
  };
  return valueValidators;
};

module.exports = (value, errorMessage = 'The value is in the wrong format', docUri = 'docs.html') => {
  /**
   * Coherce a string to a typed value and return a set of validators on that value
  */
  const cohercer = {
    toNumber: () => {
      const res = value * 1;
      if (Number.isNaN(res)) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return numberValidators(res, errorMessage, docUri);
    },

    toInt: (base = 10) => {
      const res = parseInt(value, base);
      if (Number.isNaN(res)) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return numberValidators(res, errorMessage, docUri);
    },

    toFloat: (base = 10) => {
      const res = parseFloat(value, base);
      if (Number.isNaN(res)) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return numberValidators(res, errorMessage, docUri);
    },

    toString: () => stringValidators(`${value}`, errorMessage, docUri),

    toBool: () => {
      const res = cohercer.toString(value)
        .enum(['true', 'false', 'undefined'])
        .value();
      return boolValidators(res === 'true', errorMessage, docUri);
    },
  };

  return cohercer;
};

