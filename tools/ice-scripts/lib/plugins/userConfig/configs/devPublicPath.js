module.exports = ({ context, chainWebpack }, value) => {
  const { command } = context;
  if (command === 'dev') {
    chainWebpack((config) => {
      config.output.publicPath(value);
    });
  }
};
