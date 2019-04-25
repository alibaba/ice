export default (app) => {
  app.io.of('/').route('work', app.io.controller.work.index);
  app.io.of('/').route('dev', app.io.controller.work.dev);
};
