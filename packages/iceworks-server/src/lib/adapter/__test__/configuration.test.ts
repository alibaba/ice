import * as path from 'path';
import Configuration from '../modules/configuration';
import { project, storage, tmpPath } from './common';
import { getNpmTarball, getAndExtractTarball } from 'ice-npm-utils';

const { app, assert } = require('midway-mock/bootstrap');

describe('Test adapter configuration module', () => {
  let ctx;
  let configuration;

  getNpmTarball('@icedesign/lite-scaffold', '3.0.5').then((tarball: any) => {
    getAndExtractTarball(tmpPath, tarball);
  });

  before(() => {
    configuration = new Configuration({ project, storage });
  });

  beforeEach(() => {
    ctx = app.mockContext({ i18n: app.i18n });
  });

  it('get CLI conf', async () => {
    const conf: any[] = await configuration.getCLIConf({}, ctx);
    assert(conf.length > 0);
  })

  it('set CLI conf', async () => {
    // should test distinguishing between string and boolean
    // eg: { hash: true,  outputDir: 'build' }
    await configuration.setCLIConf(
      {
        type: 'react',
        options: {
          hash: true,
          outputDir: 'build',
        }
      }
    )
    const conf: any[] = await configuration.getCLIConf({}, ctx);
    conf.forEach((item) => {
      if (item.name === 'outputDir') {
        assert.equal(item.componentProps.placeholder, 'build');
      }
      if (item.name === 'hash') {
        assert.equal(item.componentProps.defaultChecked, true);
      }
    })
  })
})