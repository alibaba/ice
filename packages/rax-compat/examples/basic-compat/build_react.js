module.exports = ({ onGetWebpackConfig }) => {
  console.log('modify alias');
  onGetWebpackConfig((config) => {
    config.resolve.alias
      .set('rax', 'rax-compat');
  });
};
