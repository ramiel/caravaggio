const blurNormalizer = require('./blur');
const extractNormalizer = require('./extract');
const flipNormalizer = require('./flip');
const oNormalizer = require('./o');
const overlayNormalizer = require('./overlay');
const progressiveNormalizer = require('./progressive');
const qNormalizer = require('./q');
const resizeNormalizer = require('./resize');
const rotateNormalizer = require('./rotate');
const UnknownOperationError = require('../errors/UnknownOperationError');


module.exports = (config) => {
  const normalizers = {
    blur: blurNormalizer,
    ex: extractNormalizer,
    extract: extractNormalizer,
    flip: flipNormalizer,
    o: oNormalizer,
    overlay: overlayNormalizer(config),
    progressive: progressiveNormalizer,
    q: qNormalizer,
    resize: resizeNormalizer,
    rotate: rotateNormalizer,
    rs: resizeNormalizer,
  };
  const defaultTransformations = config.get('defaultTransformations');

  const findSameNameOperation = name => element => element[0] === name;

  const addDefaultsTransformations = operations => defaultTransformations
    .reduce(
      (acc, [name, params]) => {
        if (acc.findIndex(findSameNameOperation(name)) !== -1) {
          return acc;
        }
        return [
          ...acc,
          [name, params],
        ];
      },
      operations,
    );

  return (options) => {
    const result = addDefaultsTransformations(options.operations).reduce(
      (acc, [name, ...params]) => {
        if (!normalizers[name]) {
          throw new UnknownOperationError(name);
        }
        const normalized = normalizers[name](...params);
        return {
          ...acc,
          ...normalized,
          input: [
            ...acc.input,
            ...(normalized.input || []),
          ],
          transformations: [
            ...acc.transformations,
            ...(normalized.transformations || []),
          ],
          output: [
            ...acc.output,
            ...(normalized.output || []),
          ],
        };
      },
      {
        ...options, input: [], transformations: [], output: [],
      },
    );
    return result;
  };
};
