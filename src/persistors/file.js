const fs = require('fs');
const path = require('path');

module.exports = ({ basePath } = { basePath: '.' }) => {
  const getCompleteFilename = filename => path.join(basePath, filename);
  return {
    exists: filename => new Promise((resolve, reject) => {
      fs.access(
        getCompleteFilename(filename),
        fs.constants.R_OK,
        err => (err ? reject(err) : resolve(true)),
      );
    }),

    read: filename => new Promise((resolve, reject) => {
      fs.readFile(getCompleteFilename(filename), (err, buffer) => {
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

    save: (filename, buffer) => new Promise((resolve, reject) => {
      fs.writeFile(
        getCompleteFilename(filename),
        buffer,
        { encoding: null },
        (err) => {
          if (err) return reject(err);
          return resolve({
            type: 'buffer',
            buffer,
          });
        },
      );
    }),
  };
};
