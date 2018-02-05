const micro = require('micro');
const listen = require('test-listen');
const request = require('request-promise');
const { router, get } = require('microrouter');
const memoryPersistor = require('../../src/persistors/memory');
const Cache = require('../../src/cache');
const route = require('../../src/routes/index');

describe('Index route - getting images', () => {
  const cache = Cache(memoryPersistor({}));
  const handler = router(get(
    '/*/*',
    route(cache),
  ));

  const imageUrl = 'http://res.cloudinary.com/ramiel/image/upload/v1478374142/gomitolo2_bxd1ti.jpg';
  const extensionlessUrl = 'https://goo.gl/eSJWLs';

  test('respond 200 if the resource has been transformed', async () => {
    const service = micro(handler);
    const url = `${await listen(service)}/q_90/${imageUrl}`;
    const response = await request({
      url,
      resolveWithFullResponse: true,
    });

    expect(response.statusCode).toBe(200);
    service.close();
  });

  test('respond 200 if the cache has been hit', async () => {
    const service = micro(handler);
    const url = `${await listen(service)}/q_90/${imageUrl}`;
    const response = await request({
      url,
      resolveWithFullResponse: true,
    });

    expect(response.statusCode).toBe(200);
    service.close();
  });

  test('return the correct mime-type', async () => {
    const service = micro(handler);
    const url = `${await listen(service)}/q_90/${imageUrl}`;
    const response = await request({
      url,
      resolveWithFullResponse: true,
    });

    expect(response.headers).toHaveProperty('content-type', 'image/jpeg');
    service.close();
  });

  test('return the correct mime-type also for extensionless url', async () => {
    const service = micro(handler);
    const url = `${await listen(service)}/q_90/${extensionlessUrl}`;
    const response = await request({
      url,
      resolveWithFullResponse: true,
    });

    expect(response.headers).toHaveProperty('content-type', 'image/jpeg');
    service.close();
  });
});
