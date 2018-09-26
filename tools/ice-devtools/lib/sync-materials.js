const rp = require('request-promise');
const inquirer = require('inquirer');
const pathExists = require('path-exists');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const [readFile, writeFile] = [fs.readFile, fs.writeFile].map(fn => promisify(fn));

const BASE_URL = 'http://localhost:7001';
const AUTH_HEADER_KEY = 'x-auth-token';
const BLOCK_URL = `http://${BASE_URL}/auth_api/v1/npm/block`;
const SCALLFOLD_URL = `http://${BASE_URL}/auth_api/v1/npm/scaffold`;
const TOKEN_PATH = path.join(__dirname, '../shared/.token');
async function tokenPrepare() {
  let token;
  const tokenExists = await pathExists(TOKEN_PATH);
  if (tokenExists) {
    return await writeToken();
  }
  token = await readFile(TOKEN_PATH, 'utf-8');

}

async function clearToken() {
  await writeFile(CLI_ROOT, '', 'utf-8');
}

async function writeToken() {
  const answers = await inquirer.prompt([{
    name: 'token',
    message: 'Please input your fusion.design site token: ',
    validate: function (input) {
      // Declare function as asynchronous, and save the done callback
      var done = this.async();
      if (typeof input === 'string' && input) {
        done(null, true);
      } else {
        done('token should be a no empty string');
      }
    }
  }]);
  const {token} = answers;
  await writeFile(TOKEN_PATH, token, 'utf-8');
  return token;
}

async function dbPrepare(cwd) {
  const dbFilePath = path.join(cwd, 'build/react-materials.json');
  const dbExists = pathExists(dbFilePath);
  if (!dbExists) {
    console.error(`build/react-materials.json can't be find in ${dbFilePath}`);
    return null;
  }

  const dbContent = await readFile(dbFilePath, 'utf-8');
  const db = JSON.parse(dbContent);
  if (!Array.isArray(db.blocks) || !Array.isArray(db.scaffolds)) {
    console.error(`build/react-materials.json is not a valid materials json`);
    return null;
  }
  return db;
}


async function syncMaterials(opt) {
  const {cwd} = opt;
  const db = await dbPrepare(cwd);
  if (!db) {
    return;
  }
  await writeToken();

}

module.exports = syncMaterials
