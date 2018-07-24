/* eslint prefer-arrow-callback: 0 */
const path = require('path');
const fs = require('fs');
const serve = require('webpack-serve');
const { resolve } = require('path');
const { readFileSync, existsSync } = require('fs');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const getWebpackConfig = require('../config/getWebpackConfig');
const routes = require('./routes');

module.exports = function startServer(opts) {
  const pkgPath = path.resolve(opts.cwd, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  return Promise.resolve()
    .then(() => {
      const entry = {
        init: ['./package.json'],
      };
      
      const config = getWebpackConfig(entry);
      config.module.rules.push({
        test: /\.md$/i,
        use: require.resolve('./demo-loader')
      });
      config.resolve.alias[pkg.name] = resolve(opts.cwd, 'src/index.js');

      return serve({
        config,
        dev: {
          stats: {
            colors: true,
            modules: false,
            chunks: false,
            entrypoints: false
          },
        },
        add: (app, middleware, options) => {
          // since we're manipulating the order of middleware added, we need to handle
          // adding these two internal middleware functions.
          app.use(bodyParser());
          middleware.content();

          app.use(async function (ctx, next) {
            ctx.compiler = options.compiler;
            ctx.projectDir = opts.cwd;
            ctx.componentPackage = pkg;
            await next();
          });
          app.use(
            views(resolve(__dirname, '../template'), {
              map: { html: 'hbs', hbs: 'handlebars' },
              options: {
                helpers: {
                  toJSON: (obj) => (JSON.stringify(obj, null, 2) || '').trim(),
                },
              },
            })
          );
          // router *must* be the last middleware added
          app.use(routes);

          middleware.webpack();
        },
      });
    })
    .then((server) => {
      server.on('Component Dev Server Listening', () => { });
    });
};
