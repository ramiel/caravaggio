const { send: microSend } = require('micro');
const zlib = require('zlib');

const DEFLATE_REGEX = /\bdeflate\b/;
const GZIP_REGEX = /\bgzip\b/;

const compressSend = method => (res, code, data) => {
  const promise = new Promise((resolve, reject) => {
    zlib[method](data, (err, compressedData) => {
      if (err) return reject(err);
      return resolve(compressedData);
    });
  });
  return promise
    .then((compressedData) => {
      res.setHeader('Content-Encoding', method);
      microSend(res, code, compressedData);
    });
};

module.exports = (config) => {
  const sendMethod = config.get('compress') === true
    ? compressSend
    : () => microSend;

  return (req) => {
    const acceptedMethod = req.headers['accept-encoding'];
    const method = false
      || (DEFLATE_REGEX.test(acceptedMethod) && 'deflate')
      || (GZIP_REGEX.test(acceptedMethod) && 'gzip');
    return method
      ? sendMethod(method)
      : microSend;
  };
};
