const path = require('path');
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin');
const cwd = process.cwd();

module.exports = async (ctx) => {
  const { params } = ctx;
  const { blockName, material } = params;
  if (!blockName) {
    return ctx.render('403.hbs');
  }

  const currentMaterial = material;
  const entryPath = path.resolve(
    cwd,
    currentMaterial,
    'blocks',
    params.blockName,
    'src/index.js'
  );

  const chunkName = currentMaterial + '/' + params.blockName;

  const state = {
    layoutJS: '/DEMOLAYOUT.js',
    blockJS: `/${chunkName}.js`,
    blockName: `${chunkName}`,
  };
  return ctx.render('block.hbs', state);
};
