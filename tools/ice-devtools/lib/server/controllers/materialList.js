const { getMaterialList } = require('../utils')

module.exports = async (ctx) => {
  const currentMaterial = ctx.params.material;

  const result = getMaterialList(currentMaterial);

  return ctx.render('blocks.hbs', {
    currentMaterial,
    blocks: result.blocks,
    layouts: result.layouts,
  });
};
