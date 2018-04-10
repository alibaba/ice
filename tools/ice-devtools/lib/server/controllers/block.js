const path = require('path');
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin');
const cwd = process.cwd();
const cachedChunks = {};

module.exports = async (ctx) => {
  const { params } = ctx;
  const { blockName, material } = params;
  if (!blockName) {
    return ctx.render('403.hbs');
  }

  // todo change type by `currentMaterial`
  const type = 'vue';

  const currentMaterial = material;
  const entryPath = path.resolve(
    cwd,
    currentMaterial,
    'blocks',
    params.blockName,
    'src/index.js'
  );

  const chunkName = currentMaterial + '/' + params.blockName;
  if (!(chunkName in cachedChunks)) {
    ctx.compiler.running = false;
    ctx.compiler.apply(new MultiEntryPlugin(cwd, [entryPath], chunkName));
    // wait until bundle ok
    await new Promise((resolve, reject) => {
      ctx.compiler.run((err) => {
        if (err) {
          resolve(err);
        } else {
          cachedChunks[chunkName] = [entryPath];
          resolve();
        }
      });
    });
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
