const path = require('path');
const fs = require('fs');
const serve = require('webpack-serve');
const glob = require('glob-promise');
const { resolve, parse, join } = require('path');
const views = require('koa-views');
const getWebpackConfig = require('../config/getWebpackConfig');
const routes = require('./routes');
const getMaterialLists = require('./getMaterialLists');

module.exports = function startServer(opts) {
  const pkgPath = path.resolve(opts.cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error('package.json not exists.');
  }

  return Promise.resolve()
    .then(() => {
      const entry = {
        package: pkgPath,
      };
      // const materialList = getMaterialLists(opts.cwd);
      // Object.keys(materialList).forEach((material) => {
      //   console.log(material, materialList[material]);
      //   Object.assign(entry, materialList[material]);
      // });

      const config = getWebpackConfig(entry);

      return serve({
        config,
        dev: {
          stats: {
            colors: true,
            chunks: false,
            children: false,
            entrypoints: false,
            chunkModules: false,
            source: false,
            cachedAssets: false,
            cached: false,
            cachedAssets: true,
            chunkOrigins: false,
            modules: false,
            builtAt: false,
          },
        },
        add: (app, middleware, options) => {
          // since we're manipulating the order of middleware added, we need to handle
          // adding these two internal middleware functions.
          middleware.webpack();
          middleware.content();

          app.use(async function(ctx, next) {
            ctx.compiler = options.compiler;
            await next();
          });
          app.use(
            views(resolve(__dirname, '../template'), {
              map: { html: 'hbs', hbs: 'handlebars' },
              options: {
                helpers: {
                  toJSON: (obj) => (JSON.stringify(obj, null, 2) || '').trim(),
                },
                partials: {
                  initReact: './init-react',
                  initVue: './init-vue',
                  sideBar: './sidebar'
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
      server.on('listening', () => {});
    });
};
