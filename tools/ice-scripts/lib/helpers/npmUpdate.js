const runCmd = require('./runCmd');
const getNpm = require('./getNpm');
const { fork } = require('child_process');

module.exports = ({ skipInstall = false } = {}) => {
  if (skipInstall) {
    return Promise.resolve();
  }
  return getNpm().then((npm) => {
    console.log('ice sdk npm bin:', npm);
    if (npm == 'tnpm' || npm == 'npm') {
      return runCmd(npm, ['update', '--save']);
    }
    return new Promise((resolve, reject) => {
      const ps = fork(npm, ['update', '--save']);

      ps.on('close', (code) => {
        if (code === 0) {
          resolve(code);
        } else {
          reject(code);
        }
      });
    });
  });
};
