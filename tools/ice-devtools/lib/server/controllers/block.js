module.exports = (ctx) => {
  const { params } = ctx;
  if (!params.blockName) {
    return ctx.render('403.hbs');
  }

  const { blockName } = params;

  const state = {
    layoutJS: '/DEMOLAYOUT.js',
    blockJS: `/block-${blockName}.js`,
    blockName: `block-${blockName}`,
  };
  return ctx.render('block.hbs', state);
};
