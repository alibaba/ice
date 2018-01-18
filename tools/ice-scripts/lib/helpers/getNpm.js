const runCmd = require('./runCmd');

module.exports = function() {
  return new Promise((resolve) => {
    if (process.env.NPM_CLI) {
      resolve(process.env.NPM_CLI);
    } else {
      return runCmd('which', ['tnpm']).then(
        () => {
          resolve('tnpm');
        },
        () => {
          resolve('npm');
        }
      );
    }
  });
};
