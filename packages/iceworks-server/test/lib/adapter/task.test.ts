import { tmpPath, storage } from './common';
import Task from '../../../src/lib/adapter/modules/task';

const { app, assert } = require('midway-mock/bootstrap');

describe('Test adapter task module', () => {
  let ctx: any;

  let task: any;

  before(async () => {
    const projectManager = app.projectManager;
    await projectManager.addProject(tmpPath);
    const project = await projectManager.setCurrent(tmpPath);
    task = new Task({ project, storage });
  });

  beforeEach(() => {
    ctx = app.mockContext({
      i18n: app.i18n,
      socket: app.io,
    });
  });

  it('start dev task', async () => {
    const args = { command: 'dev', options: {} };
    // TODO if start the dev task in the test process, this will waste a lot of time. 
    // await task.start(args, ctx);
  });

  it('get dev conf', async () => {
    const args = { command: 'dev', options: {} };
    const devConf = await task.getConf(args, ctx);
    assert(devConf.length === 5);
  });

  it('get build conf', async () => {
    const args = { command: 'build', options: {} };
    const buildConf = await task.getConf(args, ctx);
    assert(buildConf.length === 3);
  });

  it('set dev conf', async () => {
    const args = {
      command: 'dev',
      options: {
        port: '4445',
      }
    };
    await task.setConf(args);

    const devConf = await task.getConf(args, ctx);
    const portConf = devConf.find(item => item.name === 'port');
    assert(portConf.componentProps.placeholder === '4445');
  });

  it('set build conf', async () => {
    const args = {
      command: 'build',
      options: {
        outputDir: 'build',
      }
    };
    await task.setConf(args);

    const buildConf = await task.getConf(args, ctx);
    const outputDirConf = buildConf.find(item => item.name === 'outputDir');
    assert(outputDirConf.componentProps.placeholder === 'build');
  });
});
