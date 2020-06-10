export interface RawOperation {
  operation: string;
  [key: string]: string | undefined;
}
type OperationParser = (
  path: string,
  opt?: {
    OPERATION_DELIMITER?: string;
    KEY_VALUE_DELIMITER?: string;
    OPTION_DELIMITER?: string;
  }
) => Array<RawOperation>;

/**
 * Transform an url into a series of operations following the rules described
 * [here](https://gitlab.com/ramiel/caravaggio/-/issues/29)
 * @param path URL pathname to transform into operations
 * @param opt Define delimiter characters
 */
const operationParser: OperationParser = (path = '', opt) => {
  const {
    OPERATION_DELIMITER = '/',
    KEY_VALUE_DELIMITER = ':',
    OPTION_DELIMITER = ',',
  } = opt || {};

  return path
    .split(OPERATION_DELIMITER)
    .filter((p) => p !== '')
    .map((opDesc) => {
      const [op, ...options] = opDesc.split(OPTION_DELIMITER);
      if (options.length === 0) {
        const [operation, value] = op.split(KEY_VALUE_DELIMITER);
        return {
          operation,
          value: value !== undefined ? decodeURIComponent(value) : 'true',
        };
      }
      if (op.indexOf(KEY_VALUE_DELIMITER) !== -1) {
        throw new Error(`"${op}" is invalid`);
      }
      return options.reduce<RawOperation>(
        (acc, opt) => {
          const [key, value] = opt.split(KEY_VALUE_DELIMITER);
          if (key === 'operation') {
            throw new Error(
              'An operation cannot have a property called "operation"'
            );
          }
          return {
            ...acc,
            [key]: value !== undefined ? decodeURIComponent(value) : 'true',
          };
        },
        {
          operation: op,
        }
      );
    });
};

export default operationParser;
