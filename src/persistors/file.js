const fs = require('fs');
const path = require('path');

module.eports = ({ basePath } = { basePath: '.' }) => ({
  exists: filename => new Promise((resolve, reject) => {
    fs.access(
      path.join(basePath, filename),
      fs.constants.R_OK,
      err => (err ? reject(err) : resolve(true)),
    );
  }),

  read: filename => new Promise((resolve, reject) => {
    fs.readFile(path.join(basePath, filename), (err, buffer) => {
      if (err) return reject(err);
      // TODO if the error is "file not exists", resolve to null
      resolve({
        type: 'buffer',
        buffer,
      });
    });
  }),
});
