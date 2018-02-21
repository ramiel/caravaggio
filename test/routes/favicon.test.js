const micro = require('micro');
const listen = require('test-listen');
const request = require('request-promise');
const { router, get } = require('microrouter');
const favicon = require('routes/favicon');

describe('Favicon route', () => {
  test('respond 200', async () => {
    const handler = router(get(
      '/favicon.ico',
      favicon,
    ));
    const service = micro(handler);
    const url = `${await listen(service)}/favicon.ico`;
    const response = await request({
      url,
      resolveWithFullResponse: true,
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers).toHaveProperty('content-type', 'image/x-icon');
    expect(response.headers).toHaveProperty('cache-control', 'max-age=84600, public');
    service.close();
  });
});
