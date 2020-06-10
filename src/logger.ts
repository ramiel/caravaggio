import pino from 'pino';
import { Config } from './config/default';

let logger: pino.Logger;

const createLogger = (config: Config) => {
  if (logger) return logger;
  const {
    logger: { options, destination },
  } = config;
  logger = pino(options, destination);

  return logger;
};

export const getMainLogger = () => logger;

export default createLogger;
