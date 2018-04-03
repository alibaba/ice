const { getBlockList } = require('../utils');

module.exports = async (ctx) => {
  const blocks = await getBlockList(
    '/Users/zhuoling/workspace/ice-dev-tool-space/app'
  );
  const state = {
    blocks,
  };
  return ctx.render('blocks.hbs', state);
};
