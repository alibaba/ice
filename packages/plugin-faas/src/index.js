const path = require('path');
const { useExpressDevPack } = require('@midwayjs/faas-dev-pack');
const URL = require('url');

module.exports = async ({ context, onGetWebpackConfig }) => {
  const { rootDir, command } = context;

  onGetWebpackConfig((config) => {
    if (command === 'start') {
      const originalDevServeBefore = config.devServer.get('onBeforeSetupMiddleware');

      config.merge({ devServer: {
        devMiddleware: {
          writeToDisk: true,
        },
        onBeforeSetupMiddleware(server) {
          const { app } = server;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          app.use(useExpressDevPack({
            functionDir: rootDir,
            sourceDir: path.resolve(rootDir, 'src/apis'),
            ignoreWildcardFunctions: ['render'],
            // 忽略静态文件地址
            ignorePattern: (req) => {
              const { pathname } = URL.parse(req.url);
              return /\.(js|css|map|json|png|jpg|jpeg|gif|svg|eot|woff2|ttf)$/.test(pathname);
            }
          }));

          if (typeof originalDevServeBefore === 'function') {
            originalDevServeBefore(server);
          }
        },
      }});
    }
  });
};
