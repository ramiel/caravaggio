const { send } = require('micro')
const { router, get } = require('microrouter')
const optionsParser = require('./libs/optionsParser');

const index = async (req, res) => {
  send(res, 200, await Promise.resolve(optionsParser(req.params.options)));
}

module.exports = router(
  get('/:options/:image', index)
)