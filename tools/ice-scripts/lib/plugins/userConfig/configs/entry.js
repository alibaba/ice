module.exports = (api, value) => {
  const entry = api.processEntry(value);
  api.chainWebpack((config) => {
    // remove default entry then add new enrty to webpack config
    config.entryPoints.clear();
    config.merge({ entry });
  });
};
