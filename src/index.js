const { send } = require('micro')
const { router, get } = require('microrouter')

const index = async (req, res) =>
  send(res, 200, await Promise.resolve(`Hello ${req.params.image}`))

module.exports = router(
  get('/:options/:image', index)
)