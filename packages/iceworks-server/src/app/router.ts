import { ICEWORKS_PROJECT_DEV_START } from 'iceworks-events';

export default (app) => {
  app.io.of('/')
    .route(ICEWORKS_PROJECT_DEV_START, app.io.controller.project.devStart);
};
