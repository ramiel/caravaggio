import { Config } from './default';
import type { RecursivePartial } from 'configuring';

const testConfig: RecursivePartial<Config> = {
  logger: {
    options: {
      level: 'fatal',
    },
  },
};

export default testConfig;
