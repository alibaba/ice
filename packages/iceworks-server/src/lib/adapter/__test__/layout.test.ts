import { project, storage } from './common';
import Layout from '../modules/layout';
import { IProjectLayout } from '../../../interface';

const { app, assert } = require('midway-mock/bootstrap');

describe('Test adapter layout module', () => {
  let ctx: any;
  let layout: any;

  before(() => {
    layout = new Layout({ project, storage });
  });

  beforeEach(() => {
    ctx = app.mockContext({ i18n: app.i18n });
  });

  it('get all layouts', async () => {
    const allLayouts: IProjectLayout[] = await layout.getAll(undefined, ctx);
    assert.notStrictEqual(allLayouts, []);
  })

  it('get one layouts', async () => {
    const basicLayout: IProjectLayout = await layout.getOne('BasicLayout', ctx);
    assert.notStrictEqual(basicLayout, {});
  })
})
