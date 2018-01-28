const { URL } = require('url');
const { send } = require('micro');
const { router, get } = require('microrouter');
const { parseOptions } = require('./parser');
const Cache = require('./cache');
const filePersistor = require('./persistors/file');

const index = cache => async (req, res) => {
  const url = new URL(req.params.url);
  const options = parseOptions(req.params.options);

  const resource = await cache.get(url, options);
  if (resource) {
    switch (resource.type) {
      case 'buffer':
        return send(res, 200, resource.buffer);
      default:
        break;
    }
  }
  return send(res, 200, 'File not indexed yet');
};

module.exports = router(get('/:options/:image', index(Cache(filePersistor))));
