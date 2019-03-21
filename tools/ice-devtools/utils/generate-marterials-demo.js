const path = require('path');
const generate = require('./generate');
const pkgJSON = require('./pkg-json');

module.exports = async function generateMaterialsDemo(appPath) {
  const pkg = pkgJSON.getPkgJSON(appPath);

  await generate({
    src: path.join(appPath, '.template/block'),
    dest: path.join(appPath, 'blocks/ExampleBlock'),
    name: `example-block`,
    npmName: `${pkg.name}-example-block`,
    version: '1.0.0',
    title: "demo block",
    description: '示例区块'
  });

  await generate({
    src: path.join(appPath, '.template/scaffold'),
    dest: path.join(appPath, 'scaffolds/ExampleScaffold'),
    name: `example-scaffold`,
    npmName: `${pkg.name}-example-scaffold`,
    version: '1.0.0',
    title: "demo scaffold",
    description: '示例模板'
  });

  if (pkg.materialConfig.type === 'vue') {
    return;
  }

  await generate({
    src: path.join(appPath, '.template/component'),
    dest: path.join(appPath, 'components/ExampleComponent'),
    name: `example-component`,
    npmName: `${pkg.name}-example-component`,
    version: '1.0.0',
    title: "demo component",
    description: '示例组件'
  });
}