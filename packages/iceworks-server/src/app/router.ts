export default (app) => {
  app.io.of('/').route('dev', app.io.controller.tasks.dev);
};
