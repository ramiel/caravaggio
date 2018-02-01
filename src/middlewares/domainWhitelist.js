const { createError } = require('micro');
const { URL } = require('url');

const buildRegex = domains => domains && domains.map(domain => new RegExp(`^${domain
  .replace(/\./g, '\\.')
  .replace(/\*/g, '.*')}`));

module.exports = (whitelist) => {
  const validDomains = buildRegex(whitelist);
  return fn => (req, res) => {
    if (!validDomains) {
      return fn(req, res);
    }
    let valid;
    try {
      const url = (new URL(req.params._[1])).host;
      valid = validDomains.reduce((acc, test) => acc || test.test(url), false);
    } catch (e) {
      throw createError(400, `The image url is not valid: ${req.params._[1]}`);
    }
    if (!valid) {
      throw createError(403, 'The image url is not accessible due to domain restrictions');
    }
    return fn(req, res);
  };
};

