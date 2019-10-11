/**
 * generate material collection data
 *
 * 1. glob all material package.json
 * 2. generate all materials data
 * 3. write file
 */
const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');
const chalk = require('chalk');
const BluebirdPromise = require('bluebird');
const ora = require('ora');
const goldlog = require('../../lib/goldlog');
const log = require('../../lib/log');
const { DB_PATH } = require('../../lib/constants');
const generateMaterialData = require('./generateMaterialData');

module.exports = async function() {
  const cwd = process.cwd();

  const pkg = await fse.readJson(path.join(cwd, 'package.json'));
  const { materialConfig } = pkg;

  if (!materialConfig) {
    throw new Error('Invalid ice materials project, Missing `materialConfig` property in package.json file.');
  }

  goldlog('generate', materialConfig);

  const [blocks, components, scaffolds] = await Promise.all(
    ['block', 'component', 'scaffold'].map((item) => {
      return globMaterials(cwd, item);
    })
  );
  const allMaterials = [].concat(blocks).concat(components).concat(scaffolds);

  const concurrency = Number(process.env.CONCURRENCY) || 30;
  log.info(`generating materials data，total: ${allMaterials.length}，concurrency: ${concurrency}`);

  const total = allMaterials.length;
  let index = 0;
  const spinner = ora(`generate materials data progress: ${index}/${total}`).start();
  let materialsData;

  try {
    materialsData = await BluebirdPromise.map(allMaterials, (materialItem) => {
      return generateMaterialData(materialItem.pkgPath, materialItem.materialType, materialConfig).then((data) => {
        index += 1;
        spinner.text = `generate materials data progress: ${index}/${total}`;
        return data;
      });
    }, {
      concurrency,
    });
    spinner.succeed(`materials data generate successfully，start write to ${DB_PATH}...`);
  } catch(err) {
    spinner.fail('materials data generate failed!');
    throw err;
  }

  const blocksData = [];
  const componentsData = [];
  const scaffoldsData = [];
  materialsData.forEach((item) => {
    const { materialType, materialData } = item;
    if (materialType === 'block') {
      blocksData.push(materialData);
    } else if (materialType === 'component') {
      componentsData.push(materialData);
    } else if (materialType === 'scaffold') {
      scaffoldsData.push(materialData);
    }
  });

  const data = {
    ...materialConfig,
    name: pkg.name,
    description: pkg.description,
    homepage: pkg.homepage,
    author: pkg.author,
    blocks: blocksData,
    components: componentsData,
    scaffolds: scaffoldsData,
  };

  const distFilepath = path.join(cwd, DB_PATH);
  await fse.ensureFile(distFilepath);
  await fse.writeJson(distFilepath, data, { spaces: 2 });

  console.log();
  console.log(chalk.cyan(`Success! materials data generated: ${DB_PATH}`));
  console.log();
};

/**
 * @param {Path} materialDir
 * @param {String} materialType block|component|scaffold
 */
function globMaterials(materialDir, materialType) {
  return new Promise((resolve, reject) => {
    glob(
      `${materialType}s/*/package.json`,
      {
        cwd: materialDir,
        nodir: true,
      },
      (err, files) => {
        if (err) {
          reject(err);
        } else {
          const data = files.map(item => {
            return {
              pkgPath: path.join(materialDir, item),
              materialType,
            };
          });
          resolve(data);
        }
      }
    );
  });
}
