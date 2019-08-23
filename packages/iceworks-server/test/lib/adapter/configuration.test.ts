import Configuration from '../../../src/lib/adapter/modules/configuration';
import { tmpPath, storage } from './common';

const { app, assert } = require('midway-mock/bootstrap');

describe('Test adapter configuration module', () => {
  let ctx: any;

  let configuration: any;

  before(async () => {
    const projectManager = app.projectManager;
    await projectManager.addProject(tmpPath);
    const project = await projectManager.setCurrent(tmpPath);
    configuration = new Configuration({ project, storage });
  });

  beforeEach(() => {
    ctx = app.mockContext({ i18n: app.i18n });
  });

  it('get CLI conf', async () => {
    const conf: any[] = await configuration.getCLIConf(undefined, ctx);
    assert(conf !== []);
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
    const conf: any[] = await configuration.getCLIConf(undefined, ctx);
    conf.forEach((item) => {
      if (item.name === 'outputDir') {
        assert(item.componentProps.placeholder === 'build');
      }
      if (item.name === 'hash') {
        assert(item.componentProps.defaultChecked === true);
      }
    })
  })
})