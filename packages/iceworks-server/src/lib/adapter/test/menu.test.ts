import { getProject, storage } from './common';
import Menu from '../modules/menu';

const { app, assert } = require('midway-mock/bootstrap');

describe('Test adapter menu module', () => {
  let ctx: any;
  let menu: any;

  before(async () => {
    const project = await getProject();
    menu = new Menu({ project, storage });
  });

  beforeEach(() => {
    ctx = app.mockContext();
  });

  it('get all menus', async () => {
    const { asideMenuConfig, headerMenuConfig } = await menu.getAll();
    assert.notStrictEqual(asideMenuConfig, []);
    assert.notStrictEqual(headerMenuConfig, []);
  });

  it('create aside menu without replacement', async () => {
    const params = {
      data: [
        {
          position: 'aside',
          id: 'aside-test',
          name: 'AsideTest',
          path: '/test/aside',
        }
      ],
      // default options is
      // { replacement = false, type = 'aside' }
      options: {},
    };
    await menu.bulkCreate(params);
    const { asideMenuConfig, headerMenuConfig } = await menu.getAll();
    // exist in asideMenuConfig but not in headerMenuConfig
    assert.strictEqual(asideMenuConfig.some(ele => ele.path === '/test/aside'), true);
    assert.strictEqual(headerMenuConfig.some(ele => ele.path === '/test/aside'), false);
  });

  it('create aside menu with replacement', async () => {
    const params = {
      data: [
        {
          position: 'aside',
          id: 'aside-test',
          name: 'AsideTest',
          path: '/test/aside',
        }
      ],
      options: {
        replacement: true,
        type: 'aside'
      },
    };
    await menu.bulkCreate(params);
    const { asideMenuConfig, headerMenuConfig } = await menu.getAll();
    // only one aside menu in headerMenuConfig
    // exist in asideMenuConfig but not in headerMenuConfig
    assert.strictEqual(asideMenuConfig.length, 1);
    assert.strictEqual(headerMenuConfig.some(ele => ele.path === '/test/aside'), false);
  });

  it('create header menu without replacement', async () => {
    const params = {
      data: [
        {
          position: 'header',
          id: 'header-test',
          name: 'HeaderTest',
          path: '/test/header',
        }
      ],
      options: {
        replacement: false,
        type: 'header',
      },
    };
    await menu.bulkCreate(params);
    const { asideMenuConfig, headerMenuConfig } = await menu.getAll();
    // exist in headerMenuConfig but not in asideMenuConfig
    assert.strictEqual(asideMenuConfig.some(ele => ele.path === '/test/header'), false);
    assert.strictEqual(headerMenuConfig.some(ele => ele.path === '/test/header'), true);
  });

  it('create header menu with replacement', async () => {
    const params = {
      data: [
        {
          position: 'header',
          id: 'header-test',
          name: 'HeaderTest',
          path: '/test/header',
        }
      ],
      options: {
        replacement: true,
        type: 'header',
      },
    };
    await menu.bulkCreate(params);
    const { asideMenuConfig, headerMenuConfig } = await menu.getAll();
    // only one header menu in headerMenuConfig
    // exist in headerMenuConfig but not in asideMenuConfig
    assert.strictEqual(asideMenuConfig.some(ele => ele.path === '/test/header'), false);
    assert.strictEqual(headerMenuConfig.length, 1);
  })

  it('delete aside menu', async () => {
    await menu.delete({ paths: ['/test/aside'] });
    const { asideMenuConfig } = await menu.getAll();
    assert.strictEqual(asideMenuConfig.length, 0);
  });

  it('delete header menu', async () => {
    await menu.delete({ paths: ['/test/header'] });
    const { headerMenuConfig } = await menu.getAll();
    assert.strictEqual(headerMenuConfig.length, 0);
  });
})
