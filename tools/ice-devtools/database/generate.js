const { resolve } = require('path');
const { findMaterials, keys } = require('../shared/utils');

module.exports = function generate({ cwd }) {
  const materialMap = findMaterials();
  const materialList = keys(materialMap);

  for (let i = 0; i < materialList.length; i++) {
    generateDatabase({
      name: materialList[i],
      path: resolve(cwd, materialList[i]),
      options: materialMap[materialList[i]],
    });
  }
};

const generateMaterialsDatabases = require('./generate-marterials-database');
function generateDatabase({ name, path, options }) {
  generateMaterialsDatabases(name, path, options).then(() => {
    // done
    console.log(
      'All materials db generated, then you can put the db.json in a http server and put the url in Iceworks settings panel. You will see your materials in Iceworks.'
    );
  });
}
