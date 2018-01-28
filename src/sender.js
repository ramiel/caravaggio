const redirect = require('micro-redirect');

const getMimeType = (options) => {
  const type = 'jpeg';
  // if(options.o === 'original') {
  //   type =
  // }
  return `image/${type}`;
};

module.exports = {
  sendImage: (resource, options, res) => {
    switch (resource.type) {
      case 'buffer':
        res.statusCode = 200;
        res.setHeader('Content-type', getMimeType(options));
        return res.end(resource.buffer);
      case 'location':
        return redirect(res, 301, resource.location);
      default:
        throw new Error(`Invalid type of resource ${resource.type}`);
    }
  },
};
