const debug = require('debug')('ice:util:db');
const path = require('path');
const chalk = require('chalk');
const globby = require('globby');


const pkgJSON = require('./pkg-json');
const getType = require('./type');


module.exports = async function getDB(cwd) {
  let db = {
    blocks: [],
    components: [],
    scaffolds: [],
  };

  // 优先单个发版本
  const type = getType(cwd);
  const pkgs = db[`${type}s`];
  if (Array.isArray(pkgs)) {
    const pkgjson = pkgJSON.getPkgJSON(cwd);
    pkgs.push({
      source: {
        npm: pkgjson.name,
        version: pkgjson.version,
      }
    });
    return db;
  }

  const dbBasePath = path.join(cwd, 'build');
  const paths = await globby(['*.json'], {cwd: dbBasePath});
  debug('db json files: %j', paths);

  let fileIndex = paths.indexOf('react-materials.json');

  if (fileIndex < 0) {
    console.log(chalk.red('build/react-materials.json can\'t be find'));
    return null;
  }
  const dbPath = path.join(dbBasePath, paths[fileIndex]);
  db = pkgJSON.getJSON(dbPath);
  if (!Array.isArray(db.blocks) || !Array.isArray(db.scaffolds)) {
    console.error(`build/react-materials.json is not a valid materials json`);
    return null;
  }
  return db;
}
