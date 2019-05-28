module.exports = (api) => {
  api.chainWebpack((config) => {
    config.output.filename('[name].bundle.js');
  });
};
