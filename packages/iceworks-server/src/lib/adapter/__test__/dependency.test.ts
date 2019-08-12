import { project, storage } from './common';
import Dependency from '../modules/dependency';

const { app, assert } = require('midway-mock/bootstrap');

describe('Test adapter dependency module', () => {
  let ctx: any;
  let dependency: any;

  before(() => {
    dependency = new Dependency({ project, storage });
  });

  beforeEach(() => {
    ctx = app.mockContext({
      i18n: app.i18n,
      // socket: app.io.sockets,
    });
  });

  it('get all dependencies', async () => {
    const { dependencies, devDependencies } = await dependency.getAll();
    assert(dependencies.length > 0);
    assert(devDependencies.length > 0);
  });

  it('create dependency', async () => {
    const params = {
      dependency: {
        package: "ice-scripts",
        version: "latest"
      },
      isDev: true,
    }
    // TODO add socket.io
    // const result = await dependency.create(params, ctx);
  });

  it('bulkCreate dependencies', async () => {

  });

  it('reset dependencies', async () => {

  });

  it('upgrade dependency', async () => {

  });
})
