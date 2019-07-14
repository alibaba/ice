import { checkAliInternal } from 'ice-npm-utils';

export default function() {
  return async function client(ctx, next) {
    if (String(ctx.path).indexOf('/api') === 0) {
      await next();
      return;
    }

    ctx.clientConfig = {
      // default use iceworks-client@latest
      clientPath: 'http://ice.alicdn.com/iceworks-client/assets/',
      socketUrl: `//127.0.0.1:${process.env.PORT}/`,
      apiUrl: `//127.0.0.1:${process.env.PORT}/api/`,
      isAliInternal: await checkAliInternal(),
    };

    await next();
  };
}
