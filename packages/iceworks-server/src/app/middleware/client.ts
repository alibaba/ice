import { checkAliInternal } from 'ice-npm-utils';

export default function() {
  return async function client(ctx, next) {
    if (String(ctx.path).indexOf('/api') === 0) {
      await next();
      return;
    }

    ctx.clientConfig = {
      // TODO: 区分环境和端口检测
      // default use iceworks-client@latest
      clientPath: '//unpkg.com/iceworks-client@latest/build/',
      socketUrl: '//127.0.0.1:7001/',
      apiUrl: '//127.0.0.1:7001/api/',
      isAliInternal: await checkAliInternal(),
    };

    await next();
  };
}
