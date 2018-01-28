const redirect = require('micro-redirect');
const { send } = require('micro');

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
        res.setHeader('Content-type', getMimeType(options));
        return send(res, 200, resource.buffer);
      case 'location':
        return redirect(res, 301, resource.location);
      default:
        throw new Error(`Invalid type of resource ${resource.type}`);
    }
  },
};
