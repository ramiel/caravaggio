const cohercer = require('../cohercer');
const { buildDocumentationLink } = require('../utils');

module.exports = (value) => {
  const v = cohercer(value, `Blur must be a value between 0.3 and 1000. 
See ${buildDocumentationLink('blur.html')}
  `)
    .toFloat()
    .min(0.3)
    .max(1000)
    .value();

  return {
    transformations: [
      {
        name: 'blur',
        operation: 'blur',
        params: [v],
      },
    ],
  };
};
