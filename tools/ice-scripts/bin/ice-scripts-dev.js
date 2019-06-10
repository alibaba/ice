const forkChildProcess = require('../lib/utils/childProcess');

// kill child process to solve the problem of webpack compile
// node will crash because of compile multi times of webpack
const child = forkChildProcess(require.resolve('./child-process-dev.js'));
child.on('exit', (code) => {
  if (code === 1) {
    process.exit(code);
  }
});
process.on('SIGINT', () => {
  child.kill('SIGINT');
});
