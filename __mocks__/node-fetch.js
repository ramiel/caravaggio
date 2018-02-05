const path = require('path');
const fs = require('fs');

let image;
const getImage = () => (image
  ? Promise.resolve(image)
  : new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '..', 'test', 'fixtures', 'caravaggio.jpg'), (err, data) => {
      if (err) return reject(err);
      image = data;
      return resolve(data);
    });
  }));

module.exports = (/* url */) => getImage()
  .then(buffer => ({
    buffer: () => buffer,
  }));
