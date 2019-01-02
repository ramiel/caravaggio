const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');
const got = require('got');

const cache = new Map();

fetch.mockImplementation(async (url) => {
  const knownLocation = 'https://ramiel.gitlab.io/caravaggio/docs';
  if (url.indexOf(knownLocation) === 0) {
    const relativePath = url.slice(knownLocation.length);
    let data;
    if (cache.has(relativePath)) {
      data = cache.get(relativePath);
    } else {
      data = await fs.readFile(path.join(__dirname, '..', '..', 'website', 'docs', relativePath));
      cache.set(relativePath, data);
    }
    return { buffer: () => data };
  }
  const response = await got(url, { encoding: null });
  return { buffer: () => response.body };
});

