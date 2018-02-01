const path = require('path');

const persistorType = process.env.CARAVAGGIO_PERSISTOR_TYPE || 'memory';
let persistorOptions;
switch (persistorType) {
  case 'file':
    persistorOptions = {
      basePath: process.env.CARAVAGGIO_PERSISTOR_FILE_PATH || path.resolve(__dirname, '../cache'),
    };
    break;
  case 's3':
    persistorOptions = {
      key: process.env.CARAVAGGIO_PERSISTOR_S3_KEY,
      secret: process.env.CARAVAGGIO_PERSISTOR_S3_SECRET,
      bucket: process.env.CARAVAGGIO_PERSISTOR_S3_BUKET,
      redirect: process.env.CARAVAGGIO_PERSISTOR_S3_REDIRECT === 'true',
    };
    break;
  case 'memory':
    persistorOptions = {
      limit: process.env.CARAVAGGIO_PERSISTOR_MEMORY_LIMIT || 100,
    };
    break;
  default:
    throw new Error(`Persistor ${persistorType} is not valid. Check your env variable "CARAVAGGIO_PERSISTOR_TYPE"`);
}
module.exports = {
  port: parseInt(process.env.CARAVAGGIO_PORT, 10) || 8565,
  persistor: {
    type: persistorType,
    options: persistorOptions,
  },
  compress: process.env.CARAVAGGIO_COMPRESS === 'true',
};

