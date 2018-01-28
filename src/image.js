const fetch = require('node-fetch');
const sharp = require('sharp');

const Image = {
  get: url => fetch(url)
    .then(body => body.buffer()),

  getImageHandler: url => Image.get(url)
    .then(buffer => sharp(buffer)),
};

module.exports = Image;
