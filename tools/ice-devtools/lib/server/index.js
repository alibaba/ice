const serve = require('webpack-serve');
const glob = require('glob-promise');
const { resolve, parse, join } = require('path');
const views = require('koa-views');
const getWebpackConfig = require('../config/getWebpackConfig');
const routes = require('./routes');

module.exports = function startServer(opts) {
  return glob('blocks/*', { cwd: opts.cwd })
    .then((files) => {
      const entry = {};

      files.forEach((file) => {
        const { name } = parse(file);
        entry['block-' + name] = require.resolve(join(opts.cwd, file, 'src'));
      });

      const config = getWebpackConfig(entry);

      return serve({
        config,
        add: (app, middleware, options) => {
          // since we're manipulating the order of middleware added, we need to handle
          // adding these two internal middleware functions.
          middleware.webpack();
          middleware.content();

          app.use(
            views(resolve(__dirname, '../template'), {
              map: { html: 'hbs', hbs: 'handlebars' },
            })
          );
          // router *must* be the last middleware added
          app.use(routes);
        },
      });
    })
    .then((server) => {
      server.on('listening', () => {
        console.log('DEV Server Started.');
      });
    });
};
