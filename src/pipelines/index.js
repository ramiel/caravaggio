const input = require('./input');
const transformations = require('./transformations');
const output = require('./output');
const image = require('../image');

module.exports = {
  convert: (url, options) => image.getImageHandler(url.toString())
    .then(input(url, options))
    .then(transformations(url, options))
    .then(output(url, options))
    .then(pipeline => pipeline.toBuffer()),
};
