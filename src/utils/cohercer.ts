import BadRequestError from '../errors/BadRequestError';

/**
 * Create a set of chainable validators on values
 */
const numberValidators = (
  parsed: number,
  errorMessage: string,
  docUri: string,
) => {
  const valuedValidators = {
    min: (min: number) => {
      if (parsed < min) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return valuedValidators;
    },

    max: (max: number) => {
      if (parsed > max) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return valuedValidators;
    },

    multipleOf: (divisor: number) => {
      if (parsed % divisor !== 0) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return valuedValidators;
    },

    value: () => parsed,
  };
  return valuedValidators;
};

const stringValidators = (
  parsed: string,
  errorMessage: string,
  docUri: string,
) => {
  const valueValidators = {
    enum: (accept: string[] = []) => {
      if (accept.indexOf(parsed) === -1) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return valueValidators;
    },
    match: (regex: RegExp) => {
      if (!regex.test(parsed)) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return valueValidators;
    },
    value: () => parsed,
  };
  return valueValidators;
};

const boolValidators = (
  parsed: boolean,
  errorMessage: string,
  docUri: string,
) => {
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

const cohercerFactory = (
  value: string,
  errorMessage = 'The value is in the wrong format',
  docUri = 'docs.html',
) => {
  /**
   * Coherce a string to a typed value and return a set of validators on that value
   */
  const cohercer = {
    toNumber: () => {
      const res = parseInt(value, 10);
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

    toFloat: () => {
      const res = parseFloat(value);
      if (Number.isNaN(res)) {
        throw new BadRequestError(errorMessage, docUri);
      }
      return numberValidators(res, errorMessage, docUri);
    },

    toString: () => stringValidators(`${value}`, errorMessage, docUri),

    toBool: () => {
      const res = cohercer
        .toString()
        .enum(['true', 'false', 'undefined'])
        .value();
      return boolValidators(res === 'true', errorMessage, docUri);
    },
  };

  return cohercer;
};

export default cohercerFactory;
