// entry: string | array
// entry : { [name]: string | array }
module.exports = (api, value) => {
  api.chainWebpack((config) => {
    let entry;
    if (Array.isArray(value) || typeof value === 'string') {
      entry = {
        index: value,
      };
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      entry = value;
    }
    // webpack-chain entry must be [name]: [...values]
    Object.keys(entry).forEach((key) => {
      const entryValue = entry[key];
      entry[key] = typeof entryValue === 'string' ? [entryValue] : entryValue;
    });
    // remove default entry then add new enrty to webpack config
    config.entryPoints.clear();
    config.merge({ entry });
  });
};
