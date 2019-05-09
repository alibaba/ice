module.exports = (api, value) => {
  if (api.service.command === 'build') {
    api.chainWebpack((config) => {
      config.output.publicPath(value);
    });
  }
};
