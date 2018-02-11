const fs = require('fs-extra');
const os = require('os');
const path = require('path');

module.exports = ({ basePath, subdir } = { basePath: os.tmpdir(), subdir: 'caravaggioCache' }) => {
  const baseDir = path.join(basePath, subdir);
  const getCompleteFilename = filename => path.join(baseDir, filename);

  return {
    flush: () => fs.emptyDir(baseDir),

    exists: filename => fs.access(
      getCompleteFilename(filename),
      fs.constants.R_OK,
    )
      .then(() => true)
      .catch(() => false),

    read: filename => fs.readFile(getCompleteFilename(filename))
      .then(buffer => ({
        type: 'buffer',
        buffer,
      }))
      .catch((err) => {
        if (err.code === 'ENOENT') return null;
        throw err;
      }),

    save: (filename, buffer) => fs
      .outputFile(getCompleteFilename(filename), buffer, { encoding: null })
      .then(() => ({
        type: 'buffer',
        buffer,
      })),

  };
};
