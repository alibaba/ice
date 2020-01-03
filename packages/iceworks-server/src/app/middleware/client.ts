import { checkAliInternal } from 'ice-npm-utils';

const packageJSON = require('../../../package.json');

export default function() {
  return async function client(ctx, next) {
    if (String(ctx.path).indexOf('/api') === 0) {
      await next();
      return;
    }

    ctx.clientConfig = {
      // default use iceworks-client@latest
      clientPath: process.env.ICEWORKS_CORE_VERSION
        ? `https://unpkg.com/iceworks-client@${process.env.ICEWORKS_CORE_VERSION}/build/`
        : 'http://ice.alicdn.com/iceworks-client/assets/',
      socketUrl: `//127.0.0.1:${process.env.PORT}/`,
      apiUrl: `//127.0.0.1:${process.env.PORT}/api/`,
      isAliInternal: await checkAliInternal(),
      clientVersion: packageJSON.version.split('.').join(''),
    };

    await next();
  };
}
