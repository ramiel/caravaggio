import type { RecursivePartial } from 'configuring';
import { Config } from './default';

const testConfig: RecursivePartial<Config> = {
  logger: {
    options: {
      level: 'fatal',
    },
  },
};

export default testConfig;
