/**
 * This file is mainly to define the public variables used in the test.
 */
import * as path from 'path';
import storage from '../../storage';

const { app } = require('midway-mock/bootstrap');

const tmpPath = path.join(__dirname, 'tmp');

const getProject = async () => {
  const projectManager = app.projectManager;
  await projectManager.addProject(tmpPath);
  const project = await projectManager.setCurrent(tmpPath);

  return project;
}

export { getProject, storage, tmpPath };
