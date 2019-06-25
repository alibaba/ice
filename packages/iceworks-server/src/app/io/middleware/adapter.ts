export default app => {
  const logger = app.getLogger();

  return async (ctx, next) => {
    const { packet } = ctx;
    const [ eventName, args, callback ] = packet;
    const [ namespace, moduleName, methodName ] = eventName.split('.');

    if (namespace === 'adapter') {
      try {
        const { projectManager, i18n } = app;
        const project = projectManager.getCurrent();
        ctx.i18n = i18n;
        callback(null, await project.adapter[moduleName][methodName](args, ctx));
      } catch (error) {
        logger.error(error);
        callback({
          code: error.code,
          message: error.message,
        });
      }
    }

    await next();
  };
};
