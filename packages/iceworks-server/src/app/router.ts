export default (app) => {
  app.io.route('project.devStart', app.io.controller.project.devStart);
  app.io.route('project.devStop', app.io.controller.project.devStop);
  app.io.route('project.list', app.io.controller.project.list);
  app.io.route('project.current', app.io.controller.project.getCurrent);
  app.io.route('project.setCurrent', app.io.controller.project.setCurrent);
  app.io.route('page.list', app.io.controller.page.list);
  app.io.route('dependency.list', app.io.controller.dependency.list);
};
