module.exports = sharp => async (width, height/* , modeParams */) => sharp.resize(width, height, { fit: 'inside' });

