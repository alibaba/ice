const runCmd = require('./runCmd');
const getNpm = require('./getNpm');
const { fork } = require('child_process');

module.exports = () => {
  if (process.env.SKIP_INSTALL) {
    return Promise.resolve();
  }
  return getNpm().then((npm) => {
    console.log('ice sdk npm bin:', npm);
    if (npm == 'tnpm' || npm == 'npm') {
      return runCmd(npm, ['install']);
    }
    return new Promise((resolve, reject) => {
      const ps = fork(npm, ['install']);

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
