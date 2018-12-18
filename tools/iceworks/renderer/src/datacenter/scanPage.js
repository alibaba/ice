/**
 * 扫描用户目录下面有多少 page
 */

const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-unused-vars
module.exports = async function({ destDir, interpreter }) {
  if (!destDir) {
    throw new Error('没有传入正确的 destDir');
  }

  const generatorJsonPath = path.join(destDir, 'generator.json');
  const generatorJson = JSON.parse(fs.readFileSync(generatorJsonPath, 'utf-8'));

  const pages = (generatorJson.routes || []).map((item) => {
    const { page, path, layout } = item;
    return {
      page,
      path,
      layout,
    };
  });
  return pages;
};
