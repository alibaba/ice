const debug = require('debug')('ice:util:db');
const path = require('path');
const chalk = require('chalk');
const globby = require('globby');

const pkgJSON = require('./pkg-json');
const getType = require('./type');

module.exports = async function getDB(cwd) {
  const type = getType(cwd);
  let db = {
    blocks: [],
    components: [],
    scaffolds: [],
  };

  // 单个物料
  if (type) {
    const pkgjson = pkgJSON.getPkgJSON(cwd);
    db[`${type}s`].push({
      source: {
        npm: pkgjson.name,
        version: pkgjson.version,
      },
    });
    return db;
  }

  // 物料集合
  const dbBasePath = path.join(cwd, 'build');
  const paths = await globby(['*.json'], { cwd: dbBasePath });
  debug('db json files: %j', paths);

  const fileIndex = paths.indexOf('materials.json');

  if (fileIndex < 0) {
    console.log(chalk.red('materials.json can\'t be find'));
    return null;
  }

  const dbPath = path.join(dbBasePath, paths[fileIndex]);
  db = pkgJSON.getJSON(dbPath);
  if (!Array.isArray(db.blocks) || !Array.isArray(db.scaffolds)) {
    console.error(`${dbPath} is not a valid materials json`);
    return null;
  }
  return db;
};
