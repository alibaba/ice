'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const say = await 'Hello Man!!!';
    ctx.socket.emit('res', 'auth!' + say);
    await next();
    console.log('disconnect!');
  };
};
