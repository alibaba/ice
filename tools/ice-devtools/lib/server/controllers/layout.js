const path = require('path');
const { existsSync } = require('fs');
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin');
const { getMaterials } = require('../utils');

const cwd = process.cwd();
const webpackHotClient = require.resolve('webpack-hot-client/client');
const cachedChunks = {};
let watchingHandler;
let warned = false;
function warnOnce(msg) {
  if (!warned) {
    console.log('[WARN]', msg);
    warned = true;
  }
}

module.exports = async (ctx) => {
  const { params } = ctx;
  const { layoutName, material } = params;
  if (!layoutName) {
    return ctx.render('403.hbs');
  }

  const materials = getMaterials(cwd);
  let type;
  materials.find((m) => {
    if (m.directory === material) {
      type = m.type;
    }
  });

  const currentMaterial = material;
  const entryPath = path.resolve(
    cwd,
    currentMaterial,
    'layouts',
    layoutName,
    'src/index.js'
  );

  if (!existsSync(entryPath)) {
    return ctx.render('404.hbs');
  }

  const chunkName = `${currentMaterial}/${params.layoutName}`;
  if (!(chunkName in cachedChunks)) {
    ctx.compiler.running = false;
    ctx.compiler.apply(
      new MultiEntryPlugin(cwd, [webpackHotClient, entryPath], chunkName)
    );
    // wait until bundle ok
    await new Promise((resolve, reject) => {
      const watchOpts = {
        aggregateTimeout: 20,
      };
      if (watchingHandler) {
        watchingHandler.close(() => {
          watchingHandler = ctx.compiler.watch(watchOpts, handler);
        });
      } else {
        watchingHandler = ctx.compiler.watch(watchOpts, handler);
      }

      function handler(err, stats) {
        if (err) {
          resolve(err);
        } else {
          cachedChunks[chunkName] = [entryPath];
          resolve();
        }
      }
    });
    ctx.compiler.running = true;
  }

  const state = {
    layoutJS: '/DEMOLAYOUT.js',
    blockJS: `/${chunkName}.js`,
    blockName: `${chunkName}`,
    isReact: type === 'react',
    isVue: type === 'vue',
  };
  return ctx.render('block.hbs', state);
};
