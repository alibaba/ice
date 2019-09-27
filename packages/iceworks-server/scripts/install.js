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

function installTNPM() {
  console.log('>>> Start install tnpm client...');

  return execa
    .shell('npm install --registry=https://registry.npm.alibaba-inc.com -g tnpm', {
      stdio: 'inherit',
    })
    .then(() => Promise.resolve(true))
    .catch(() => {
      console.log('>>> install tnpm client error \r\n');

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
      return installTNPM();
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
