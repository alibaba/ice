const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const { promisify } = require('util');
const getConfigPath = require('./config-path');

const [readFile, writeFile] = [fs.readFile, fs.writeFile].map((fn) =>
  promisify(fn)
);
const TOKEN_PATH = path.join(getConfigPath(), '.token');

async function tokenPrepare(isInnerNet) {
  const tokenExists = fs.existsSync(TOKEN_PATH);
  if (!tokenExists) {
    return writeToken(isInnerNet);
  }
  const tokenFile = await readFile(TOKEN_PATH, 'utf-8');

  let token;
  try {
    token = JSON.parse(tokenFile).token;
  } catch (error) {
    token = null;
  }

  if (!token) {
    return writeToken(isInnerNet);
  }
  return token;
}

async function clearToken() {
  await writeFile(TOKEN_PATH, '{"token": ""}', 'utf-8');
}

async function writeToken(isInnerNet) {
  TokenFirstLyMessage(isInnerNet);
  const answers = await inquirer.prompt([
    {
      name: 'token',
      message: 'Please input your fusion.design token: ',
      validate(input) {
        // Declare function as asynchronous, and save the done callback
        const done = this.async();
        if (typeof input === 'string' && input) {
          done(null, true);
        } else {
          done('token should be a no empty string');
        }
      },
    },
  ]);
  const { token } = answers;
  await writeFile(TOKEN_PATH, JSON.stringify({ token }, null, 2), 'utf-8');
  return token;
}

module.exports = {
  writeToken, clearToken, tokenPrepare,
};

function TokenFirstLyMessage(isInnerNet) {
  console.log();
  console.log();
  const address = `https://${isInnerNet ? 'fusion.alibaba-inc.com' : 'fusion.design'}/help.html#/dev-create-site`;
  console.log(`如果这是你第一次使用该功能,或者不知道如何获取Token。\n请查看文档: ${chalk.yellow(address)}`);
  console.log();
  console.log();
}
