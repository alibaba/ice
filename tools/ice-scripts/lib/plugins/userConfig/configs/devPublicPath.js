module.exports = (api, value) => {
  if (api.command === 'dev') {
    api.chainWebpack((config) => {
      config.output.publicPath(value);
    });
  }
};
