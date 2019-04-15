export default (app) => {
  return class Controller extends app.Controller {
    async index() {
      const message = this.ctx.args[0];
      console.log('=============');
      console.log('chat :', message + ' : ' + process.pid);
      console.log('=============');
      const say = await 'Hello Man!';
      this.ctx.socket.emit('res', say);
    }
  };
};
