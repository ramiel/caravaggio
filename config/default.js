/**
 * This is the default configuration file.
 * If you are running caravaggio through docker you should read instructions
 * here (https://store.docker.com/community/images/ramielcreations/caravaggio)
 * on how to configure it.
 *
 * This file is intended for developers or deeper customizations.
 *
 * The configuration is based on `config` (https://github.com/lorenwest/node-config)
 * and it can be extended and overwritten in several ways as explained here (https://github.com/lorenwest/node-config/wiki/Configuration-Files)
 *
 * The quickest way to overwrite it with your own configuration is to create a `local.json`
 * file in the `/config` folder, as sibling of this file, and to override only the changed
 * properties.
*/

const ONE_YEAR = 60 * 60 * 24 * 365;

module.exports = {
  port: parseInt(process.env.PORT, 10) || 8565,

  /**
   * Caravaggio has several caches
   */
  caches: {
    /**
     * OUTPUT CACHE
     * Cache for the transformed images.
     * Given the same input url and the same transformation options,
     * this cache saves the output buffer to avoir re-compute the transformations
     */
    output: {
      /**
       * Available types of persistors:
       *
       * file:     Save images on local disk. On by default is the easiest to configure
       * memory:   Save images in memory. Useful on development, can drain a lot of memory.
       * none:     Never save the images. The images will be re-calculated each time. Very useful if
       *           you plan to put a cache on front of this service, like CloudFront or CloudFlare.
       * s3:       Save the images on Amazon S3 (not yet available)
       */
      type: 'memory',
      options: {},

      /**
       * File
       * type: 'file',
       * options: {
       *  basPath: '/tmp/',                 // The folder to store the images in.
       * }
       *
       *
       * Memory
       * type: 'memory',
       * options: {
       *  limit: 100,                       // The limit expressed in MB. Can be false for no limit.
       *                                    // Default to 100
       * }
       *
       * Disk-less
       * type: 'none',
       * options: {}
       *
       *
       * S3 persistor (not yet available)
       *
       * type: 's3',
       * options: {
       *   key: process.env.S3_KEY,           // the aws key
       *   secret: process.env.S3_KEY,        // the aws secret
       *   bucket: process.env.S3_BUCKET,     // the bucket to use
       *   redirect: false,                   // if true, serve the file from s3 directly
       * }
      */
    },

    /**
     * INPUT CACHE
     * This cache let you avoid download several time the same input image
     * Given the same url, the original image is cached and not re-downloaded
     * This accept the same type as the output cache
     */
    input: {
      type: 'none',
      options: {},
    },
  },

  /**
   * Allow only files in the domain whitelist.
   * This can be an array of domains and wildcard are supported
   * whitelist: ["images.google.com", "*.mydomain.net"]
   */
  whitelist: false,

  /**
   * Logger definition. Define how the application should log event
   * level: The log level. One among: fatal, error, warn, info, debug, trace, silent
   *        The log will appear from your choosen level and upon, i.e.
   *        (error -> error, fatal)
   *        (info -> info, warn, error, fatal)
   * stream: Where to stream the log. Can be `stdout`, `stderr` or a file path
   * pretty: Print a pretty out instead of the json one
   */
  logger: {
    level: 'info',
    stream: 'stdout',
    pretty: false,
  },

  /**
   * Define the cache directive sent in the response
   * browserCache: false    // Set no cache directive
   * browserCache: {
   *    maxAge: 60,         // Define the max-age in seconds
   * }
   */
  browserCache: {
    maxAge: ONE_YEAR,
  },
  /**
   * Try to guess the file type from extension. This could speed up a process but consider that
   * - it is not always applicable (file without extension)
   * - Sometimes it gains nothing (because, i.e., the file metadata have been already red)
   *
   * In general it's safe to leave this option false
   */
  guessTypeByExtension: false,

  /**
   * Some transformations can be applied by default
   */
  defaultTransformations: [
    /**
     * Serve the image as progressive (jpg, png only) by default. The user does not need to pass
     * a progressive option to have this feature enabled.
     * This is a good default for images which will be served through the browser
     */
    ['progressive', 'true'],
  ],

  /**
   * Options for sharp.
   * cache: true|false|object  Refer to the official documentation http://sharp.pixelplumbing.com/en/stable/api-utility/#cache
   */
  sharp: {
    cache: true,
  },

  /**
   * Let you decide how to show errors.
   * It can be 'html', 'json' and 'plain'
   * Default to 'html'
   */
  errors: 'json',

  /**
   * Compress the response through deflate/gzip
   * The requester must add `Accept-Encoding` header otherwise this option is ignored.
   * By default is false because usually this behavior is delegated to CDNs
   */
  compress: false,
};

