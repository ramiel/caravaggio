const path = require('path');

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
  compress: true,
};

