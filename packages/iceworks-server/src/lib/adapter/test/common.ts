/**
 * This file is mainly to define the public variables used in the test.
 */
import * as path from 'path';
import storage from '../../storage';

const { app } = require('midway-mock/bootstrap');

const tmpPath = path.join(__dirname, 'tmp');

const getProject = async (path: string = tmpPath) => {
  const projectManager = app.projectManager;
  await projectManager.addProject(path);
  const project = await projectManager.setCurrent(path);

  return project;
}

export { getProject, storage, tmpPath };
