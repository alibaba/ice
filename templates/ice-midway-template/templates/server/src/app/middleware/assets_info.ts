module.exports = (app) => {
  return async (ctx, next) => {
    const env = ctx.app.env;
    ctx.assets = {
      // 当前 egg-static 地址
      prefix: '/',
    };
    if (env === 'local') {
      // Webpack 本地开发热加载地址
      ctx.assets.prefix = 'http://127.0.0.1:4444/';
    }

    await next();
  };
};
