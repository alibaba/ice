export default function() {
  return async function client(ctx, next) {
    if (String(ctx.path).indexOf('/api') === 0) {
      await next();
      return;
    }

    ctx.clientConfig = {
      // TODO //unpkg.com/iceworks-client@1.0.0-beta.0/build/
      clientPath: '//127.0.0.1:4444/',
      socketUrl: '//127.0.0.1:7001/',
      apiUrl: '//127.0.0.1:7001/api/'
    };

    await next();
  };
}
