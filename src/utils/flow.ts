/**
 * Given an array of async functions, return a function that takes the same argument as each function
 * in the array. Each function is executed in series and the first that doesn't crash, returns the
 * value
 * @param fns Array of async functions
 */
export const tryEach = <T, TArgs extends unknown[]>(
  fns: Array<(...args: TArgs) => Promise<T | null>>,
  opt?: {
    onError?: (e: Error) => void;
    ignoreResult?: (result: unknown) => boolean;
  }
) => {
  const { ignoreResult = () => false } = opt || {};
  return async (...args: TArgs) => {
    for (let i = 0, len = fns.length; i < len; i++) {
      try {
        const pluginresult = await fns[i](...args);
        if (!ignoreResult(pluginresult)) {
          return pluginresult;
        }
      } catch (e) {
        opt?.onError?.(e as Error);
      }
    }
    throw new Error(`TryEach failed. No function returned a value`);
  };
};
