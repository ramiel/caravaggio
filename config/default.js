const path = require('path');

module.exports = {
  port: parseInt(process.env.PORT, 10) || 8565,
  persistor: {
    type: 'file', // availabe: file, memory, s3
    options: {
      basePath: path.resolve(__dirname, '../cache'),
    },

    /**
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

