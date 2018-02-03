const path = require('path');

const ONE_YEAR = 60 * 60 * 24 * 365;

module.exports = {
  port: parseInt(process.env.PORT, 10) || 8565,
  persistor: {
    /**
     * Available types of persistors:
     *
     * file:     Save images on local disk. On by default is the easiest to configure
     * memory:   Save images in memory. Useful on development, can drain a lot of memory. Do not use
     *           on production
     * none: Never save the images. The images will be re-calculated each time. Very useful if
     *           you plan to put a cache on front of this service, like CloudFront or CloudFlare.
     * s3:       Save the images on Amazon S3
     */
    type: 'file',
    options: {
      basePath: path.resolve(__dirname, '../cache'),
    },

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
     *  limit: 100,                       // The limit expressed in MB. Can be false for no limit
     * }
     *
     * Disk-less
     * type: 'none',
     * options: {}
     *
     *
     * S3 persistor
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
   * Allow only files in the domain whitelist.
   * This can be an array of domains and wildcard are supported
   * whitelist: ["images.google.com", "*.mydomain.net"]
   */
  whitelist: false,

  /**
   * Logger definition. Define how the application should log event
   * level: The log level. One among: fatal, error, warn, info, debug
   *        The log will appear from your choosen level and upon, i.e.
   *        (error -> error, fatal)
   *        (info -> info, warn, error, fatal)
   * stream: Where to stream the log. Can be `stdout`, `stderr` or a file path
   */
  logger: {
    level: 'info',
    stream: 'stdout',
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
  compress: true,
};

