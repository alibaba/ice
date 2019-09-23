import { tmpPath, storage } from './common';
import Menu from '../../../src/lib/adapter/modules/menu';

const { assert, app } = require('midway-mock/bootstrap');

describe('Test adapter menu module', () => {
  let menu: any;

  before(async () => {
    const projectManager = app.projectManager;
    await projectManager.addProject(tmpPath);
    const project = await projectManager.setCurrent(tmpPath);
    menu = new Menu({ project, storage });
  });

  it('get all menus', async () => {
    const { asideMenuConfig, headerMenuConfig } = await menu.getAll();
    assert(asideMenuConfig.length !== 0);
    assert(headerMenuConfig.length !== 0);
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
      options: {
        replacement: false,
        type: 'aside'
      },
    };
    await menu.bulkCreate(params);
    const { asideMenuConfig, headerMenuConfig } = await menu.getAll();
    // exist in asideMenuConfig but not in headerMenuConfig
    const isAsideMenuExist = asideMenuConfig.some(ele => ele.path === '/test/aside');
    const isHeaderMenuExist = headerMenuConfig.some(ele => ele.path === '/test/aside');
    assert(isAsideMenuExist);
    assert(!isHeaderMenuExist);
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
    assert(asideMenuConfig.length, 1);
    assert(!headerMenuConfig.some(ele => ele.path === '/test/aside'));
  });

  it('create aside menu with replacement and children', async () => {
    const params = {
      data: [
        {
          position: 'aside',
          id: 'aside-test',
          name: 'AsideTest',
          path: '/test/aside',
          children: [
            {
              position: 'aside',
              id: 'aside-children-test',
              name: 'AsideChildrenTest',
              path: '/test/aside/children',
            }
          ]
        }
      ],
      options: {
        replacement: true,
        type: 'aside'
      },
    };
    await menu.bulkCreate(params);
    const { asideMenuConfig } = await menu.getAll();

    // exist in asideMenuConfig but not in headerMenuConfig
    const isAsideMenuExist = asideMenuConfig.some(ele => ele.children[0].path === '/test/aside/children');
    assert(isAsideMenuExist);
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
    const isAsideMenuExist = asideMenuConfig.some(ele => ele.path === '/test/header');
    const isHeaderMenuExist = headerMenuConfig.some(ele => ele.path === '/test/header');

    assert(!isAsideMenuExist);
    assert(isHeaderMenuExist);
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
    const isAsideMenuExist = asideMenuConfig.some(ele => ele.path === '/test/header');
    assert(!isAsideMenuExist);
    assert(headerMenuConfig.length === 1);
  })

  it('delete aside children menu', async () => {
    await menu.delete({ paths: ['/test/aside/children'] });
    const { asideMenuConfig } = await menu.getAll();
    assert(asideMenuConfig[0].children.length === 0);
  });

  it('delete aside menu', async () => {
    await menu.delete({ paths: ['/test/aside'] });
    const { asideMenuConfig } = await menu.getAll();
    assert(asideMenuConfig.length === 0);
  });

  it('delete header menu', async () => {
    await menu.delete({ paths: ['/test/header'] });
    const { headerMenuConfig } = await menu.getAll();
    assert(headerMenuConfig.length === 0);
  });
})
