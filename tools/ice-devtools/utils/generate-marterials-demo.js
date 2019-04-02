/**
 * generate demo for material project
 */
const path = require('path');
const { readdirSync, statSync } = require('fs');
const uppercamelcase = require('uppercamelcase');
const generate = require('./generate');
const pkgJSON = require('./pkg-json');

module.exports = async function generateMaterialsDemo(appPath) {
  const pkg = pkgJSON.getPkgJSON(appPath);

  // block component ...
  const types = readdirSync(path.join(appPath, '.template')).filter((file) =>
    statSync(path.join(appPath, '.template', file)).isDirectory()
  );

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    await generate({
      src: path.join(appPath, `.template/${type}`),
      dest: path.join(appPath, `${type}s/Example${uppercamelcase(type)}`),
      name: `example-${type}`,
      npmName: `${pkg.name}-example-${type}`,
      version: '1.0.0',
      title: `demo ${type}`,
      description: '示例',
      skipGitIgnore: true,
    });
  }
};
