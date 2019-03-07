const path = require('path');
const generate = require('./generate');
const pkgJSON = require('./pkg-json');

module.exports = async function generateMaterialsDemo(tmpPath, appPath) {
  const pkg = pkgJSON.getPkgJSON(appPath);

  await generate({
    src: path.join(appPath, '.template/block'),
    dest: path.join(appPath, 'blocks/ExampleBlock'),
    name: `block-example`,
    npmName: `${pkg.name}-block-example`,
    version: '1.0.0',
    description: '示例区块'
  });

  await generate({
    src: path.join(appPath, '.template/scaffold'),
    dest: path.join(appPath, 'scaffolds/ExampleScaffold'),
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
    dest: path.join(appPath, 'components/ExampleComponent'),
    name: `component-example`,
    npmName: `${pkg.name}-component-example`,
    version: '1.0.0',
    description: '示例组件'
  });
}