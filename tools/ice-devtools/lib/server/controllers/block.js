const path = require('path');
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin');
const cwd = process.cwd();

module.exports = async (ctx) => {
  const { params } = ctx;
  if (!params.blockName) {
    return ctx.render('403.hbs');
  }

  const currentMaterial = ctx.params.material;
  const entryPath = path.resolve(
    cwd,
    currentMaterial,
    'blocks',
    params.blockName,
    'index'
  );

  const chunkName = currentMaterial + '/' + params.blockName;
  ctx.compiler.apply(new MultiEntryPlugin(cwd, [entryPath], chunkName));
  // ctx.webpack.invalidate();
  console.log(cwd, [entryPath], chunkName);

  const { blockName } = params;

  const state = {
    layoutJS: '/DEMOLAYOUT.js',
    blockJS: `/block-${blockName}.js`,
    blockName: `block-${blockName}`,
  };
  return ctx.render('block.hbs', state);
};
