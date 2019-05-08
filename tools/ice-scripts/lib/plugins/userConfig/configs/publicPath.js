module.exports = (api, value) => {
  if (api.command === 'build') {
    api.chainWebpack((config) => {
      config.output.publicPath(value);
    });
  }
};
