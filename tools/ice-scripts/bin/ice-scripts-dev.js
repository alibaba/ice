const { fork } = require('child_process');

function restartProcess(scriptPath) {
  const child = fork(scriptPath, process.argv.slice(2));
  child.on('message', (data) => {
    if (data && data.type === 'RESTART_DEV') {
      child.kill();
      restartProcess(scriptPath);
    }
    if (process.send) {
      process.send(data);
    }
  });
  return child;
}

// kill child process to solve the problem of webpack compile
// node will crash because of compile multi times of webpack
const devChild = restartProcess(require.resolve('./child-process-dev.js'));
devChild.on('exit', (code) => {
  // code maybe null
  if (code && code !== 0) {
    process.exit(code);
  }
});
process.on('SIGINT', () => {
  devChild.kill('SIGINT');
});
