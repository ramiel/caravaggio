const { send } = require('micro');
const { router, get } = require('microrouter');
const { parseOptions } = require('./libs/parser');

const index = async (req, res) => {
  send(res, 200, await Promise.resolve(parseOptions(req.params.options)));
};

module.exports = router(get('/:options/:image', index));
