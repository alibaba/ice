export default (app) => {
  const { controller } = app.io;
  const { project, material } = controller;

  app.io.route('project.index.list', project.index.list);
  app.io.route('project.index.delete', project.index.delete);
  app.io.route('project.index.add', project.index.add);
  app.io.route('project.index.current', project.index.getCurrent);
  app.io.route('project.index.setCurrent', project.index.setCurrent);
  app.io.route('project.page.list', project.page.list);
  app.io.route('project.dependency.list', project.dependency.list);
  app.io.route('project.dev.start', project.dev.start);
  app.io.route('project.dev.stop', project.dev.stop);
  app.io.route('project.dev.settings', project.dev.settings);
  app.io.route('project.dev.detail', project.dev.detail);
  app.io.route('project.configuration.settings', project.configuration.settings);

  app.io.route('material.index.resource', material.index.resource);
  app.io.route('material.index.current', material.index.current);
};
