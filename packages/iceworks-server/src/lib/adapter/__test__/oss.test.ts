import OSS from '../modules/oss';
import { project, storage } from './common';

const { app, assert } = require('midway-mock/bootstrap');

describe('Test adapter OSS module', () => {
  let ctx: any;
  let oss: any;

  before(() => {
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
    assert.equal(newConfig.region, args.region);
    const config = await oss.getConfig();
    assert.equal(config.region, args.region);
    // delete test args
    await oss.setConfig({ region: '' });
  });

  it('get config', async () => {
    const config = await oss.getConfig();
    assert.equal(Object.keys(config).length, 2);
  });

  it('upload oss', async () => {
    // TODO upload oss
    // await oss.upload({}, ctx);
  })
})