const { ICEWORKS_TASK_DEV_OPEN } = require('iceworks-events');

export default (app) => {
  app.io.of('/').route(ICEWORKS_TASK_DEV_OPEN, app.io.controller.tasks.dev);
};
