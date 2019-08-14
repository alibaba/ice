import { getProject, storage } from './common';
import Dependency from '../modules/dependency';

const { app, assert } = require('midway-mock/bootstrap');

describe('Test adapter dependency module', () => {
  let ctx: any;
  let dependency: any;

  before(async () => {
    const project = await getProject();
    dependency = new Dependency({ project, storage });
  });

  beforeEach(() => {
    ctx = app.mockContext({
      i18n: app.i18n,
      socket: app.io,
    });
  });

  it('get all dependencies', async () => {
    const { dependencies, devDependencies } = await dependency.getAll();

    // dependencies and devDependencies should all exist
    assert.notDeepStrictEqual(dependencies, []);
    assert.notDeepStrictEqual(devDependencies, []);
  });

  it('create dependency', async () => {
    const params = {
      dependency: {
        package: "ice-scripts",
        version: "latest"
      },
      isDev: true,
    }
    // TODO
    // const result = await dependency.create(params, ctx);
  });

  it('bulkCreate dependencies', async () => {
    const params = {
      dependencies: [{
        package: "lodash",
        version: "latest"
      }],
      isDev: true,
    }
    // TODO installing the dependencies is too slow. 
    // const result = await dependency.bulkCreate(params, ctx);
  });

  it('reset dependencies', async () => {

  });

  it('upgrade dependency', async () => {

  });
})
