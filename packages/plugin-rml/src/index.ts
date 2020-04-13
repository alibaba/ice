module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.module
      .rule('compile')
      .test(/\.rml$/i)
      .use('rml')
      .loader('@reactml/loader')
      .options({
        renderer: 'react',
      });
  });
};
