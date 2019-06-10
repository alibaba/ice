const { fork } = require('child_process');

module.exports = function childProcess(scriptPath) {
  const child = fork(scriptPath);
  child.on('message', (data) => {
    if (data && data.type === 'RESTART_DEV') {
      child.kill();
      childProcess(scriptPath);
    }
    if (process.send) {
      process.send(data);
    }
  });
  return child;
};

