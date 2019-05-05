export default (app) => {
  app.io.route('project.dev.start', app.io.controller.project.devStart);
  app.io.route('project.dev.stop', app.io.controller.project.devStop);
};
