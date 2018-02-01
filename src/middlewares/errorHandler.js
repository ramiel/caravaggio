const { send } = require('micro');

module.exports = fn => async (req, res) => {
  try {
    return await fn(req, res);
  } catch (err) {
    return send(res, err.statusCode || 500, err.message || 'An unknown error happened');
  }
};

