const { send } = require('micro');
const fs = require('fs-extra');
const path = require('path');

let favicon;

const getFavicon = async () => {
  if (!favicon) {
    favicon = await fs.readFile(path.resolve(__dirname, '..', '..', 'static', 'favicon.ico'));
  }
  return favicon;
};

module.exports = async (req, res) => {
  res.setHeader('cache-control', 'max-age=84600, public');
  res.setHeader('content-type', 'image/x-icon');
  send(res, 200, await getFavicon());
};

