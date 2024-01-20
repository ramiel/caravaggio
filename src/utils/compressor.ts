import { Config } from '../config/default';
import { ServerRequest, ServerResponse } from 'microrouter';
import zlib from 'zlib';
import { send as microSend } from 'micro';

const BROTLI_REGEX = /\bbr\b/;
const DEFLATE_REGEX = /\bdeflate\b/;
const GZIP_REGEX = /\bgzip\b/;

enum COMPRESSION_METHODS {
  br = 'brotliCompress',
  deflate = 'deflate',
  gzip = 'gzip',
}

const compressSend =
  (method: COMPRESSION_METHODS) =>
  (res: ServerResponse, code: number, data: Buffer) => {
    const promise = new Promise((resolve, reject) => {
      zlib[method](data, (err, compressedData) => {
        if (err) return reject(err);
        return resolve(compressedData);
      });
    });
    return promise.then((compressedData) => {
      res.setHeader(
        'Content-Encoding',
        method === COMPRESSION_METHODS.br ? 'br' : method
      );
      microSend(res, code, compressedData);
    });
  };

const compressor = (config: Config) => {
  const sendMethod = config.compress ? compressSend : () => microSend;

  return (req: ServerRequest) => {
    const acceptedMethod = req.headers['accept-encoding'];
    const method =
      false ||
      (BROTLI_REGEX.test(acceptedMethod as string) && COMPRESSION_METHODS.br) ||
      (DEFLATE_REGEX.test(acceptedMethod as string) &&
        COMPRESSION_METHODS.deflate) ||
      (GZIP_REGEX.test(acceptedMethod as string) && COMPRESSION_METHODS.gzip);
    return method ? sendMethod(method) : microSend;
  };
};

export default compressor;
