import { LoggerOptions, DestinationStream } from 'pino';
import { RawOperation } from '../utils/operationParser';
import type { PluginConstructor } from '../pluginLoader/pluginLoader';

interface CacheBaseConfig {
  type: 'memory' | 'file' | 'none' | (() => unknown);
  options: unknown;
}

export interface FileCacheOptions {
  /**
   * The folder to store the images in.
   */
  basePath?: string;
}

/**
 * File
 * type: 'file',
 * options: {
 *  basPath: '/tmp/',                 // The folder to store the images in.
 * }
 *
 */
interface FileCacheConfig extends CacheBaseConfig {
  type: 'file';
  options: FileCacheOptions;
}

export interface MemoryCacheOptions {
  /**
   * The limit expressed in MB. No limit if `false`.
   * Default to 100
   */
  limit?: number;
}

/**
 * Memory
 * type: 'memory',
 */
interface MemoryCacheConfig extends CacheBaseConfig {
  type: 'memory';
  options: MemoryCacheOptions;
}

export type NoneCacheOptions = unknown | null;

/**
 * Disk-less
 * type: 'none',
 * Do not cache
 */
interface NoneCacheConfig extends CacheBaseConfig {
  type: 'none';
  options: NoneCacheOptions;
}
/**
 * Available types of caches:
 *
 * file:     Save images on local disk. On by default is the easiest to configure
 * memory:   Save images in memory. Useful on development, can drain a lot of memory.
 * none:     Never save the images. The images will be re-calculated each time. Very useful
 *           if you plan to put a cache on front of this service, like CloudFront or
 *           CloudFlare.
 * s3:       Save the images on Amazon S3 (not yet available)
 */
export type CacheConfig = FileCacheConfig | MemoryCacheConfig | NoneCacheConfig;
export type CacheOptions =
  | FileCacheOptions
  | MemoryCacheOptions
  | NoneCacheOptions;

export interface Config {
  /**
   * Set this value if caravaggio is served from a subfolder. i.e "/api"
   */
  basePath?: string;
  /**
   * Caravaggio has several caches
   */
  caches?: {
    /**
     * OUTPUT CACHE
     * Cache for the transformed images.
     * Given the same input url and the same transformation options,
     * this cache saves the output buffer to avoir re-compute the transformations
     */
    output?: CacheConfig;
    /**
     * INPUT CACHE
     * This cache let you avoid download several time the same input image
     * Given the same url, the original image is cached and not re-downloaded
     * This accept the same type as the output cache
     */
    input?: CacheConfig;
  };
  /**
   * Define the cache directive sent in the response
   * If undefined set no cache directive
   * It can be a string like `max-age: 1000, public`
   * or an object:
   * browserCache: {
   *    maxAge: 60, // Define the max-age in seconds
   * }
   */
  browserCache?:
    | {
        maxAge: number;
      }
    | string;
  /**
   * Allow only files in the domain whitelist.
   * This can be an array of domains and wildcard are supported
   * whitelist: ["images.google.com", "*.mydomain.net"]
   */
  whitelist?: string[];
  /**
   * Logger definition. Define how the application should log event
   */
  logger?: {
    /**
     * level: The log level. One among: fatal, error, warn, info, debug, trace, silent
     *        The log will appear from your choosen level and upon, i.e.
     *        (error -> error, fatal)
     *        (info -> info, warn, error, fatal)
     * pretty: Print a pretty out instead of the json one
     */
    options?: LoggerOptions;
    /**
     * destination: Where to stream the log. Can be `process.stdout`, `process.stderr` or a file path
     */
    destination?: DestinationStream;
  };
  /**
   * Let you decide how to show errors.
   * It can be 'html', 'json' and 'plain'
   * Default to 'html'
   */
  errors?: 'json' | 'html' | 'plain';
  /**
   * Compress the response through deflate/gzip
   * The requester must add `Accept-Encoding` header otherwise this option is ignored.
   * By default is false because usually this behavior is delegated to CDNs
   */
  compress?: boolean;
  /**
   * Plugin section
   * EXPERIMENTAL. Plugins are not available for production yet
   */
  plugins?: {
    /**
     * A series of path where to look for plugins
     */
    paths?: string[];
    /**
     * All the plugins
     */
    plugins: Array<{
      name: string;
      instance?: PluginConstructor;
      disabled?: boolean;
      options?: unknown;
    }>;
  };

  defaultOperations?: Array<RawOperation>;
}
const ONE_YEAR = 60 * 60 * 24 * 365;

const defaultConfig: Config = {
  caches: {
    input: {
      type: 'none',
      options: null,
    },
    output: {
      type: 'memory',
      options: {
        limit: 100,
      },
    },
  },
  browserCache: {
    maxAge: ONE_YEAR,
  },
  whitelist: [],
  errors: 'html',
  logger: {
    options: {
      level: process.env.LOG_LEVEL || 'debug',
      prettyPrint: true,
    },
    destination: process.stdout,
  },
  compress: false,
  defaultOperations: [{ operation: 'progressive', value: 'true' }],
};

export default defaultConfig;
