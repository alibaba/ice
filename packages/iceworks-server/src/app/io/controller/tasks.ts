const execa = require('execa');

export default (app) => {
  return class Controller extends app.Controller {
    async dev() {
      const { ctx } = this;
      const message = ctx.args[0] || {};
      const socket = ctx.socket;

      console.log('dev task:', message + ' : ' + process.pid);

      const child = execa.shell('npm', ['-v'], {
        cwd: process.cwd(),
        stdio: ['inherit', 'pipe', 'pipe'],
        shell: true,
      });

      child.stdout.on('data', (buffer) => {
        socket.emit('output', buffer.toString());
        socket.emit('TASK:DEV:RESPONSE', 'dev successful');
      });
    }
  };
};
