const serve = require('webpack-serve');
const webpack = require('webpack');
const glob = require('glob-promise');
const { resolve, parse, join } = require('path');
const views = require('koa-views');
const getWebpackConfig = require('../config/getWebpackConfig');
const routes = require('./routes');
// const getEntry = require('./getEntry');

module.exports = function startServer(opts) {
  // const entries = getEntry(opts.cwd);

  // console.log(entries);
  return Promise.resolve()
    .then(() => {
      const entry = {};

      // files.forEach((file) => {
      //   const { name } = parse(file);
      //   entry['block-' + name] = require.resolve(join(opts.cwd, file, 'src'));
      // });

      const config = getWebpackConfig(entry);
      const compiler = webpack(config);

      return serve({
        compiler,
        hot: false,
        add: (app, middleware, options) => {
          // since we're manipulating the order of middleware added, we need to handle
          // adding these two internal middleware functions.
          middleware.webpack();
          middleware.content();

          app.use(async function(ctx, next) {
            ctx.compiler = compiler;
            await next();
          });
          app.use(
            views(resolve(__dirname, '../template'), {
              map: { html: 'hbs', hbs: 'handlebars' },
              options: {
                helpers: {
                  toJSON: (obj) => JSON.stringify(obj, null, 2).trim(),
                },
              },
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
