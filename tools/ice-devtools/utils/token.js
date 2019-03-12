const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const { promisify } = require('util');
const getTempPath = require('./temp-path');

const [readFile, writeFile] = [fs.readFile, fs.writeFile].map((fn) =>
  promisify(fn)
);
const TOKEN_PATH = path.join(getTempPath(), '.token');

async function tokenPrepare() {
  let token;
  const tokenExists = fs.existsSync(TOKEN_PATH);
  if (!tokenExists) {
    return writeToken();
  }
  tokenFile = await readFile(TOKEN_PATH, 'utf-8');
  try {
    token = JSON.parse(tokenFile).token;
  } catch (error) {
    token = null;
  }

  if (!token) {
    return writeToken();
  }
  return token;
}

async function clearToken() {
  await writeFile(TOKEN_PATH, '{"token": ""}', 'utf-8');
}

async function writeToken() {
  TokenFirstLyMessage();
  const answers = await inquirer.prompt([
    {
      name: 'token',
      message: 'Please input your fusion.design token: ',
      validate: function (input) {
        // Declare function as asynchronous, and save the done callback
        var done = this.async();
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

function TokenFirstLyMessage() {
  console.log();
  console.log();
  console.log(`如果这是你第一次使用该功能,或者不知道如何获取Token。\n请查看文档: ${chalk.yellow('https://fusion.design/help.html#/dev-create-site')}`);
  console.log();
  console.log();
}
