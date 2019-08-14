import Configuration from '../modules/configuration';
import { getProject, storage } from './common';

const { app, assert } = require('midway-mock/bootstrap');

describe('Test adapter configuration module', () => {
  let ctx: any;

  let configuration: any;

  before(async () => {
    const project = await getProject();
    configuration = new Configuration({ project, storage });
  });

  beforeEach(() => {
    ctx = app.mockContext({ i18n: app.i18n });
  });

  it('get CLI conf', async () => {
    const conf: any[] = await configuration.getCLIConf(undefined, ctx);
    assert.notStrictEqual(conf, []);
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
        assert.strictEqual(item.componentProps.placeholder, 'build');
      }
      if (item.name === 'hash') {
        assert.strictEqual(item.componentProps.defaultChecked, true);
      }
    })
  })
})