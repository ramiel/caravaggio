/* eslint-env jest */

const path = require('path');
const fs = require('fs');

const getImage = (name = 'caravaggio.jpg') => new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, '..', 'test', 'fixtures', name), (err, data) => {
    if (err) return reject(err);
    return resolve(data);
  });
});

module.exports = jest.fn((/* url */) => getImage()
  .then(buffer => ({
    buffer: () => buffer,
  })));
