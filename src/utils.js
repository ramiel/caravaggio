module.exports = {
  compose: (...fns) => fns.reduce((f, g) => (...args) => f(g(...args))),

  getPipelineOperationSortFunction: order => (a, b) => {
    const aIndex = order.indexOf(a.name);
    const bIndex = order.indexOf(b.name);
    return aIndex - bIndex;
  },

  buildDocumentationLink: doc => `https://ramiel.gitlab.io/caravaggio/docs/${doc || 'docs.html'}`,

  isPercentage: percentage => `${percentage}`.indexOf('.') !== -1,
  percentageToPixel: (percentage, size) => Math.round(percentage * size),
};

