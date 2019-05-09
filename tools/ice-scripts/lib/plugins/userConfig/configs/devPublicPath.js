module.exports = (api, value) => {
  const { command } = api.service;
  if (command === 'dev') {
    api.chainWebpack((config) => {
      config.output.publicPath(value);
    });
  }
};
