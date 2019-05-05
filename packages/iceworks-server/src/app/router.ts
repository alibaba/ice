export default (app) => {
  const { controller } = app.io;
  const { project } = controller;

  app.io.route('project.index.devStart', project.index.devStart);
  app.io.route('project.index.devStop', project.index.devStop);
  app.io.route('project.index.list', project.index.list);
  app.io.route('project.index.current', project.index.getCurrent);
  app.io.route('project.index.setCurrent', project.index.setCurrent);
  app.io.route('project.page.list', project.page.list);
  app.io.route('project.dependency.list', project.dependency.list);
};
