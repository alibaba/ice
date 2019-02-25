const debug = require('debug')('ice:util:db');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const globby = require('globby');

const { promisify } = require('util');
const [readFile, writeFile] = [fs.readFile, fs.writeFile].map((fn) =>
  promisify(fn)
);

const pkgJSON = require('../utils/pkg-json');

module.exports = async function getDB(cwd) {
  const dbBasePath = path.join(cwd, 'build');
  const paths = await globby(['*.json'], {cwd: dbBasePath});
  debug('db json files: %j', paths);

  let fileIndex = paths.indexOf('react-materials.json');

  if (fileIndex < 0) {
    console.log(chalk.red('build/react-materials.json can\'t be find'));
    return null;
  }
  const dbPath = path.join(dbBasePath, paths[fileIndex]);
  const db = pkgJSON.getJSON(dbPath);
  if (!Array.isArray(db.blocks) || !Array.isArray(db.scaffolds)) {
    console.error(`build/react-materials.json is not a valid materials json`);
    return null;
  }
  return db;
}
