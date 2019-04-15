export default (app) => {
  app.io.of('/').route('work', app.io.controller.work.index);
};
