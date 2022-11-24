const plugin = () => ({
  name: 'plugin-weex-external',
  setup: ({ onGetConfig }) => {
    onGetConfig((config) => {
      // External weex module.
      config.configureWebpack ??= [];
      config.configureWebpack.push((webpackConfig) => {
        const { externals } = webpackConfig;
        webpackConfig.externals = [
          ({ request }, callback) => {
            if (request.indexOf('@weex-module') >= 0) {
              return callback(null, `commonjs ${request}`);
            }
            callback();
          },
        ];
        if (Array.isArray(externals)) {
          webpackConfig.externals.concat(externals);
        } else if (typeof externals === 'object') {
          webpackConfig.externals.push(externals);
        }
        return webpackConfig;
      });
    });
  },
});

export default plugin;
