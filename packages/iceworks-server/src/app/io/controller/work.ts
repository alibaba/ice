const pty = require('node-pty');

export default (app) => {
  return class Controller extends app.Controller {
    async index() {
      const message = this.ctx.args[0];
      console.log('=============');
      console.log('work :', message + ' : ' + process.pid);
      console.log('=============');
      const say = await 'Hello Man!';
      this.ctx.socket.emit('res', say);
    }

    async dev() {
      const { ctx } = this;
      const message = ctx.args[0] || {};
      const socket = ctx.socket;

      socket.emit('TASK:DEV:RESPONSE', 'dev 启动成功');
      console.log('dev :', message + ' : ' + process.pid);

      let ptyProcess = pty.spawn('bash', ['--login'], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME,
        env: process.env,
      });

      ptyProcess.on('data', (data) => socket.emit('output', data));
      socket.on('input', (data) => ptyProcess.write(data));
    }
  };
};
