const getBlockPaths = require('./getBlockPaths');

module.exports = function getBlockComponentsPaths({ cwd, name, blocks, preview }) {
  return blocks.map((block) => {
    return getBlockPaths({
      cwd,
      name,
      block,
      preview,
    });
  });
};
