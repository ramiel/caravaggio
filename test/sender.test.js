const config = require('config');
const sender = require('sender');
const { send } = require('micro');
const { deflate, gzip } = require('zlib');

jest.mock('zlib', () => ({
  deflate: jest.fn((data, cb) => cb(null, data)),
  gzip: jest.fn((data, cb) => cb(null, data)),
}));
jest.mock('micro', () => ({
  send: jest.fn(),
}));


describe('Sender', () => {
  beforeEach(() => {
    send.mockClear();
    deflate.mockClear();
    gzip.mockClear();
  });

  test('it exports a sendImage function', () => {
    const senderFunctions = sender(config);
    expect(senderFunctions).toHaveProperty('sendImage', expect.any(Function));
  });
  describe('sendImage', () => {
    const bufferResource = {
      type: 'buffer',
      buffer: Buffer.from(''),
    };
    const options = {};
    const req = {
      headers: {},
    };
    const deflateReq = {
      headers: {
        'accept-encoding': 'deflate',
      },
    };
    const gzipReq = {
      headers: {
        'accept-encoding': 'gzip',
      },
    };
    const res = {
      setHeader: jest.fn(),
    };

    test('it sends a buffer through micro send', async () => {
      await sender(config).sendImage(bufferResource, options, req, res);
      expect(send).toHaveBeenCalledTimes(1);
    });

    test('the content-type is set', async () => {
      await sender(config).sendImage(bufferResource, options, req, res);
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', expect.any(String));
    });

    test('the content-length is set', async () => {
      await sender(config).sendImage(bufferResource, options, req, res);
      expect(res.setHeader).toHaveBeenCalledWith('Content-Length', expect.any(Number));
    });
    test('the cache-control is set', async () => {
      await sender(config).sendImage(bufferResource, options, req, res);
      expect(res.setHeader).toHaveBeenCalledWith('cache-control', expect.any(String));
    });

    test('the result is not compressed if the configuration is false', async () => {
      config.compress = false;
      await sender(config).sendImage(bufferResource, options, req, res);
      expect(deflate).not.toHaveBeenCalled();
      expect(gzip).not.toHaveBeenCalled();
    });

    test('the result is compressed (deflate) if the configuration is true and the requester accept deflate', async () => {
      config.compress = true;
      await sender(config).sendImage(bufferResource, options, deflateReq, res);
      expect(deflate).toHaveBeenCalledTimes(1);
      expect(gzip).not.toHaveBeenCalled();
    });

    test('the result is NOT compressed (deflate) if the configuration is true and the requester does not accept deflate', async () => {
      config.compress = true;
      await sender(config).sendImage(bufferResource, options, req, res);
      expect(gzip).not.toHaveBeenCalled();
      expect(deflate).not.toHaveBeenCalled();
    });

    test('the result is compressed (gzip) if the configuration is true and the requester accept gzip', async () => {
      config.compress = true;
      await sender(config).sendImage(bufferResource, options, gzipReq, res);
      expect(gzip).toHaveBeenCalledTimes(1);
      expect(deflate).not.toHaveBeenCalled();
    });

    test('the result is NOT compressed (gzip) if the configuration is true and the requester does not accept gzip', async () => {
      config.compress = true;
      await sender(config).sendImage(bufferResource, options, req, res);
      expect(deflate).not.toHaveBeenCalled();
      expect(gzip).not.toHaveBeenCalled();
    });
  });
});

