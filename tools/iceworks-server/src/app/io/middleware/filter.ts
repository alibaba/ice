'use strict';

module.exports = () => {
  return async (ctx, next) => {
    console.log(ctx.packet);
    const say = await 'Hello Man!';
    ctx.socket.emit('res', 'packet!' + say);
    await next();
    console.log('packet response!');
  };
};
