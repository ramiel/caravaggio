/* eslint-env jest */
import path from 'path';
import fs from 'fs';

const getImage = (name = 'caravaggio.jpg') =>
  new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, '..', 'test', 'fixtures', name),
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      },
    );
  });

export default jest.fn((/* url */) =>
  getImage().then((buffer) => ({
    buffer: () => buffer,
  })),
);
