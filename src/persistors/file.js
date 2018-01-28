const fs = require('fs');
const path = require('path');

module.exports = ({ basePath } = { basePath: '.' }) => ({
  exists: filename => new Promise((resolve, reject) => {
    fs.access(
      path.join(basePath, filename),
      fs.constants.R_OK,
      err => (err ? reject(err) : resolve(true)),
    );
  }),

  read: filename => new Promise((resolve, reject) => {
    fs.readFile(path.join(basePath, filename), (err, buffer) => {
      if (err) {
        if (err.code === 'ENOENT') return resolve(null);
        return reject(err);
      }
      // TODO if the error is "file not exists", resolve to null
      return resolve({
        type: 'buffer',
        buffer,
      });
    });
  }),
});
