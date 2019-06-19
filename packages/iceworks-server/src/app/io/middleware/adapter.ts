export default app => {
  const logger = app.getLogger();

  return async (ctx, next) => {
    const { packet } = ctx;
    const [ eventName, args, callback ] = packet;
    const [ namespace, moduleName, methodName ] = eventName.split('.');

    if (namespace === 'adapter') {
      try {
        const { projectManager } = app;
        const project = projectManager.getCurrent();
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
