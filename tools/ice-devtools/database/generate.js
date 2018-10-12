const { resolve } = require('path');
const { findMaterials, keys } = require('../shared/utils');

module.exports = function generate({ cwd }) {
  const materialList = findMaterials();

  for (let i = 0; i < materialList.length; i++) {

    const { directory, type, ...options } = materialList[i];
    // debug('material params index: %s, directory: %s', i, directory);

    generateDatabase({
      name: directory || (type ? `${type}-materials` : 'db'),
      path: resolve(cwd, directory),
      options: options,
    });
  }
};

const generateMaterialsDatabases = require('./generate-marterials-database');
function generateDatabase({ name, path, options }) {
  generateMaterialsDatabases(name, path, options).then(() => {
    // done
    console.log(
      'All materials JSON generated, you can upload the JSON file to a static web server and put the URL at Iceworks settings panel. You will see your materials in Iceworks.'
    );
  });
}
