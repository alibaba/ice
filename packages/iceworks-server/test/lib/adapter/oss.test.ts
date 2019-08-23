import OSS from '../../../src/lib/adapter/modules/oss';
import { tmpPath, storage } from './common';

const { app, assert } = require('midway-mock/bootstrap');

describe('Test adapter OSS module', () => {
  let ctx: any;

  let oss: any;

  before(async () => {
    const projectManager = app.projectManager;
    await projectManager.addProject(tmpPath);
    const project = await projectManager.setCurrent(tmpPath);
    oss = new OSS({ project, storage });
  });

  beforeEach(() => {
    ctx = app.mockContext({ i18n: app.i18n });
  });

  it('get buckets', async () => {
    // TODO no accesskey Id
    // const buckets = await oss.getBuckets();
  });

  it('set config', async () => {
    const args = {
      region: 'oss-cn-shanghai',
    };
    const newConfig = await oss.setConfig(args);
    assert(newConfig.region === args.region);
    const config = await oss.getConfig();
    assert(config.region === args.region);
    // delete test args
    await oss.setConfig({ region: '' });
  });

  it('get config', async () => {
    const config = await oss.getConfig();
    assert(config.region === '');
  });

  it('upload oss', async () => {
    // TODO upload oss
    // await oss.upload({}, ctx);
  })
})