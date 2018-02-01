const micro = require('micro');
const listen = require('test-listen');
const request = require('request-promise');
const { router, get } = require('microrouter');
const domainWhitelistMiddleware = require('../../src/middlewares/domainWhitelist');
const errorHandlerMiddleware = require('../../src/middlewares/errorHandler');
const { compose } = require('../../src/utils');

describe('Domain whitelist middleware', () => {
  const handler = async (req, res) => {
    micro.send(res, 200, { a: 'b' });
  };

  test('it pass if the whitelist is false', async () => {
    const service = micro(router(get(
      '/*/*',
      domainWhitelistMiddleware(false)(handler),
    )));
    const url = `${await listen(service)}/q_90/https://domain.com/image.png`;
    const body = await request(url);

    expect(JSON.parse(body)).toHaveProperty('a', 'b');
    service.close();
  });

  test('it pass if the whitelist contains the domain', async () => {
    const service = micro(router(get(
      '/*/*',
      domainWhitelistMiddleware(['domain.com'])(handler),
    )));
    const url = `${await listen(service)}/q_90/https://domain.com/image.png`;
    const body = await request(url);

    expect(JSON.parse(body)).toHaveProperty('a', 'b');
    service.close();
  });

  test('it doesn\'t pass if the url is a subdomain', async () => {
    const service = micro(router(get(
      '/*/*',
      compose(
        errorHandlerMiddleware,
        domainWhitelistMiddleware(['domain.com']),
      )(handler),
    )));
    const url = `${await listen(service)}/q_90/https://sub.domain.com/image.png`;

    await expect(request(url)).rejects.toBeDefined();
    service.close();
  });

  test('it passes if the url is a subdomain and a wildcard is set', async () => {
    const service = micro(router(get(
      '/*/*',
      domainWhitelistMiddleware(['*.domain.com'])(handler),
    )));
    const url = `${await listen(service)}/q_90/https://sub.domain.com/image.png`;

    await expect(request(url)).resolves.toBeDefined();
    service.close();
  });

  test('it doesn\'t pass if the url is another domain', async () => {
    const service = micro(router(get(
      '/*/*',
      compose(
        errorHandlerMiddleware,
        domainWhitelistMiddleware(['domain.com']),
      )(handler),
    )));
    const url = `${await listen(service)}/q_90/https://domain.net/image.png`;

    await expect(request(url)).rejects.toHaveProperty('statusCode', 403);
    service.close();
  });

  test('rejects if the passed parameter is not an url', async () => {
    const service = micro(router(get(
      '/*/*',
      compose(
        errorHandlerMiddleware,
        domainWhitelistMiddleware(['domain.com']),
      )(handler),
    )));
    const url = `${await listen(service)}/q_90/domain.net/image.png`;
    await expect(request(url)).rejects.toHaveProperty('statusCode', 400);
    await expect(request(url)).rejects.toHaveProperty('message', '400 - "The image url is not valid: domain.net/image.png"');
    service.close();
  });

  describe('using a wildcard', () => {
    test('it pass if the url is a sub-subdomain', async () => {
      const service = micro(router(get(
        '/*/*',
        domainWhitelistMiddleware(['*.domain.com'])(handler),
      )));
      const url = `${await listen(service)}/q_90/https://a.b.domain.com/image.png`;

      await expect(request(url)).resolves.toBeDefined();
      service.close();
    });
  });
});
