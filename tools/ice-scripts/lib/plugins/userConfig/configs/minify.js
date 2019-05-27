module.exports = ({ context, chainWebpack }, value) => {
  const { command } = context;
  // minify always be false in dev mode
  const minify = command === 'dev' ? false : value;
  chainWebpack((config) => {
    config.optimization.minimize(minify);
  });
};
