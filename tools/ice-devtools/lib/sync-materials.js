const rp = require('request-promise');
const inquirer = require('inquirer');
const pathExists = require('path-exists');
const path = require('path');
const fs = require('fs');
const ora = require('ora');
const colors = require('colors/safe')
const {promisify} = require('util');
const [readFile, writeFile] = [fs.readFile, fs.writeFile].map(fn => promisify(fn));

const BASE_URL = 'http://127.0.0.1:7001';
// const BASE_URL = 'https://mc.fusion.design';
const AUTH_HEADER_KEY = 'x-auth-token';
const BLOCK_URL = `${BASE_URL}/auth_api/v1/npm/block`;
const SCALLFOLD_URL = `${BASE_URL}/auth_api/v1/npm/scaffold`;
const TOKEN_PATH = path.join(__dirname, '../chore/.token');
const debug = require('debug')('ice:sync-materials');

async function tokenPrepare() {
  let token;
  const tokenExists = await pathExists(TOKEN_PATH);
  if (!tokenExists) {
    return writeToken();
  }
  tokenFile = await readFile(TOKEN_PATH, 'utf-8');
  token = JSON.parse(tokenFile).token;
  if (!token) {
    return writeToken();
  }
  return token;
}

async function clearToken() {
  await writeFile(TOKEN_PATH, '{"token": ""}', 'utf-8');
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
  await writeFile(TOKEN_PATH, JSON.stringify({token}, null, 2), 'utf-8');
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

function requestAPI(materials) {
  const spin = ora({
    text: 'start sync your materials to https://fusion.design',
    color: 'blue',
  });
  spin.start();
  let promise = Promise.resolve();
  for (let index = 0; index < materials.length; index++) {
    const element = materials[index];

    promise = promise.then(() => {
      const options = {
        method: 'POST',
        uri: element.url,
        body: element.data,
        headers: {
          [AUTH_HEADER_KEY]: element.token,
        },
        json: true // Automatically stringifies the body to JSON
      }
      debug('index: %s, \noptions: %j',index, options);
      return rp(options).then(function (body) {
        debug('index: %s, body: %j', index, body);
        const {code} = body;
        if (code === 1) {
          spin.stopAndPersist({symbol: colors.green('(￣▽￣)~* '), text: `${element.name} sync success`});
          return;
        }
        return Promise.reject({statusCode: 200, response: {body}});

      }).catch(err => {
          const {statusCode, response} = err;
          if (statusCode === 403 && response.body && response.body.code === 403) {
            clearToken();
            spin.stopAndPersist({symbol: colors.red('(╯°□°）╯︵┻━┻ '), text: `token authorization fail, you can find your token at https://fusion.design`});
          } else if (statusCode === 200) {
            spin.stopAndPersist({symbol: colors.red('(╯°□°）╯︵┻━┻ '), text: `${element.name} sync fail for season: ${response.body.message}`});
          } else {
            console.error('\n', err);
            spin.fail(`${element.name} sync fail: \n`);
          }

          return Promise.reject(); // 返回错误只是为了打断后续流程
      });
    });
  }

  return promise.then(() => spin.succeed('all done')).catch((err) => {
    spin.fail('sync fail')
  });
}



async function syncMaterials(opt) {

  const {cwd} = opt;
  const db = await dbPrepare(cwd);
  if (!db) {
    return;
  }
  const token = await tokenPrepare();
  if (!token) {
    return;
  }

  const {blocks, scaffolds} = db;
  const requestData = [
    ...blocks.map(block => ({url: BLOCK_URL, token, data: block, name: block.name})),
    ...scaffolds.map(scaffold => ({url: SCALLFOLD_URL, token, data: scaffold, name: scaffold.name}))
  ];

  await requestAPI(requestData);
}

module.exports = syncMaterials;
