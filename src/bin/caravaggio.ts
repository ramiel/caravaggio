#!/usr/bin/env node
import os from 'os';
import { RecursivePartial, createConfigManager } from 'configuring';
import micro from 'micro';
import yargs from 'yargs';
import defaultConfig, { Config, CacheConfig } from '../config/default';
import caravaggio from '../index';
import createLogger from '../logger';
import { RawOperation } from '../utils/operationParser';

// biome-ignore lint/complexity/noForEach: Too few cases, it's safe
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal as 'SIGINT' | 'SIGTERM', () => process.exit(0));
});

async function run() {
  const options =
    // .help('Caravaggio')
    await yargs
      .option('port', {
        alias: 'p',
        default: process.env.PORT ? parseInt(process.env.PORT) : 8565,
        describe: 'the server will listen to this port',
        type: 'number',
      })
      .option('cache', {
        default: 'memory',
        describe: 'Set the cache system',
        type: 'string',
        choices: ['memory', 'file', 'redis', 'none'],
        group: 'cache',
      })
      .option('cache-filepath', {
        describe: '[when --cache=file] The file path for the file cache',
        type: 'string',
        default: os.tmpdir(),
        group: 'cache',
      })
      .option('cache-limit', {
        default: 100,
        describe:
          '[when --cache=memory|redis] The maximum amount of memory to use in MB. [when --cache=redis] Use the Redis configuration default.',
        type: 'number',
        group: 'cache',
      })
      .option('cache-url', {
        default: process.env.REDIS_URL || '',
        describe: "[when --cache=redis] The Redis cache's URL",
        type: 'string',
        group: 'cache',
      })

      .option('inputcache', {
        default: 'none',
        describe:
          'Set the input cache system. This cache save the original images to avoid re-download',
        type: 'string',
        choices: ['memory', 'file', 'redis', 'none'],
        group: 'input cache',
      })
      .option('inputcache-filepath', {
        describe: '[when --inputcache=file] The file path for the file cache',
        type: 'string',
        default: os.tmpdir(),
        group: 'input cache',
      })
      .option('inputcache-limit', {
        default: 100,
        describe:
          '[when --inputcache=memory|redis] The maximum amount of memory to use in MB.',
        type: 'number',
        group: 'input cache',
      })
      .option('inputcache-url', {
        default: process.env.REDIS_URL || '',
        describe: "[when --inputcache=redis] The Redis cache's URL",
        type: 'string',
        group: 'cache',
      })

      .option('whitelist', {
        describe: 'Restrict the images to a list of domains',
        type: 'array',
        group: 'security',
      })

      .option('verbose', {
        alias: 'v',
        describe: 'Increase the verbosity of the application',
        type: 'boolean',
        // conflicts: 'quiet',
        group: 'log',
      })
      .option('quiet', {
        alias: 'q',
        describe: 'Do not output anything',
        type: 'boolean',
        // conflicts: 'verbose',
        group: 'log',
      })
      .option('json', {
        describe: 'Output logs in json format.',
        type: 'boolean',
        default: false,
        group: 'log',
      })
      // .conflicts('verbose', 'quiet')
      .options('progressive', {
        describe:
          'the output images are progressive by default (when applicable)',
        type: 'boolean',
        default: true,
        group: 'image manipulation',
      })
      .options('errors', {
        describe: 'set the error output format',
        type: 'string',
        choices: ['plain', 'html', 'json'],
        default: 'json',
        group: 'misc',
      })
      .options('compress', {
        describe:
          'compress the response through gzip/deflate/brotli if the browser asks for it',
        type: 'boolean',
        default: false,
        group: 'misc',
      }).argv;

  const defaultOperations: Array<RawOperation> = [];
  defaultOperations.push({
    operation: 'progressive',
    value: `${options.progressive}`,
  });

  let cacheOptions: Record<string, unknown>;
  switch (options.cache) {
    case 'file':
      cacheOptions = {
        basePath: options['cache-filepath'],
      };
      break;
    case 'memory':
      cacheOptions = {
        limit: options['cache-limit'],
      };
      break;
    case 'redis':
      cacheOptions = {
        limit: options['cache-limit'],
        url: options['cache-url'],
      };
      break;
    default:
      cacheOptions = {};
      break;
  }

  let inputCacheOptions: Record<string, unknown> | undefined;
  switch (options.inputcache) {
    case 'file':
      inputCacheOptions = {
        basePath: options['inputcache-filepath'],
      };
      break;
    case 'memory':
      inputCacheOptions = {
        limit: options['inputcache-limit'],
      };
      break;
    case 'redis':
      cacheOptions = {
        limit: options['cache-limit'],
        url: options['inputcache-url'],
      };
      break;
    default:
      inputCacheOptions = {};
      break;
  }

  const cliConfig: RecursivePartial<Config> = {
    caches: {
      output: {
        type: options.cache,
        options: cacheOptions,
      } as CacheConfig,
      input: {
        type: options.inputcache,
        options: inputCacheOptions,
      } as CacheConfig,
    },
    logger: {
      options: {
        prettyPrint: !options.json,
        level: options.verbose ? 'debug' : options.quiet ? 'silent' : 'info',
      },
    },
    whitelist: (options.whitelist as string[]) || [],
    errors: options.errors as 'json' | 'plain' | 'html' | undefined,
    compress: options.compress,
    defaultOperations,
  };

  const configManager = createConfigManager<Config>({
    configurations: {
      default: defaultConfig,
      cli: cliConfig,
    },
  });

  const config = configManager.getConfig('cli');
  const { port } = options;

  const logger = createLogger(config);
  const server = micro(caravaggio(config));

  logger.debug({
    ...config,
    logger: {
      ...config.logger,
      destination: 'stdout',
    },
  });

  server.listen(port);

  logger.info(
    `Caravaggio started on port ${port}. Preview at http://localhost:${port}`,
  );
}

run();
