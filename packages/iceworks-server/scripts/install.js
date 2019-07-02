const execa = require('execa');
const path = require('path');
const { checkAliInternal } = require('ice-npm-utils');

function installDEF() {
  console.log('>>> Start install DEF client...');

  return execa
    .shell('tnpm install @ali/def-pub-client', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    })
    .then(() => Promise.resolve(true))
    .catch(() => {
      console.log('>>> install @ali/def-pub-client error \r\n');

      return Promise.resolve(true);
    });
}

function installStark() {
  console.log('>>> Start install stark biz generator...');

  return execa.shell('tnpm install @ali/stark-biz-generator', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });
}

function checkTNPM() {
  return execa
    .shell('tnpm -v')
    .then(() => Promise.resolve(true))
    .catch(() => {
      console.log('>>> Please install tnpm by: \r\n');
      console.log('`npm install --registry=https://registry.npm.alibaba-inc.com -g tnpm` \r\n');
      console.log('>>> More infos: https://npm.alibaba-inc.com/  \r\n');

      return Promise.resolve(false);
    });
}

function install() {
  checkAliInternal()
    .then((isInternal) => {
      if (isInternal) {
        return checkTNPM();
      }
    })
    .then((checked) => {
      if (checked) {
        return installDEF();
      }
    })
    .then((finished) => {
      if (finished) {
        return installStark();
      }
    })
    .catch(() => {
      // tnpm will output install errors
    });
}

install();
