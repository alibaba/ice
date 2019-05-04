import { ICEWORKS_PROJECT_DEV_START, ICEWORKS_PROJECT_DEV_STOP } from 'iceworks-events';

export default (app) => {
  app.io.route(ICEWORKS_PROJECT_DEV_START, app.io.controller.project.devStart);
  app.io.route(ICEWORKS_PROJECT_DEV_STOP, app.io.controller.project.devStop);
};
