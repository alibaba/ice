const { exec } = require('child_process');
const { getEnv } = require('../env');

module.exports = function(cmd, cwd) {
  return new Promise((resolve, reject) => {
    exec(
      cmd,
      {
        cwd,
        env: getEnv(),
      },
      (error, stdout, stderr) => {
        if (error) {
          reject(stdout + stderr);
        } else {
          resolve(stdout + stderr);
        }
      }
    );
  });
};
