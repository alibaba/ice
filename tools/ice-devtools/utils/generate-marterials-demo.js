const path = require('path');
const generate = require('./generate');
const pkgJSON = require('./pkg-json');

module.exports = async function generateMaterialsDemo(tmpPath, appPath) {
  const pkg = pkgJSON.getPkgJSON(appPath);

  await generate({
    src: path.join(appPath, '.template/block'),
    dest: path.join(appPath, 'blocks/BlockExample'),
    name: `block-example`,
    npmName: `${pkg.name}-block-example`,
    version: '1.0.0',
    description: '示例区块'
  });

  await generate({
    src: path.join(appPath, '.template/scaffold'),
    dest: path.join(appPath, 'scaffolds/ScaffoldExample'),
    name: `scaffold-example`,
    npmName: `${pkg.name}-scaffold-example`,
    version: '1.0.0',
    description: '示例模板'
  });

  if (pkg.materialConfig.type === 'vue') {
    return;
  }

  await generate({
    src: path.join(appPath, '.template/component'),
    dest: path.join(appPath, 'compoonents/ComponentExample'),
    name: `compoonent-example`,
    npmName: `${pkg.name}-compoonent-example`,
    version: '1.0.0',
    description: '示例组件'
  });
}