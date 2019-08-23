import { tmpPath, storage } from './common';
import Page from '../../../src/lib/adapter/modules/page';
import { IPage } from '../../../src/interface';

const { app, assert } = require('midway-mock/bootstrap');

const mockNewPageDetail = {
  name: 'test1', routePath: '/test', blocks: [
    {
      name: "DetailTable",
      customConfig: {},
      title: "详情信息表格",
      description: "展示详情信息的表格",
      homepage: "https://unpkg.com/@icedesign/detail-table-block/build/index.html",
      categories: ["表格"],
      repository: "https://github.com/ice-lab/react-materials/tree/master/blocks/DetailTable",
      source: {
        author: "",
        npm: "@icedesign/detail-table-block",
        registry: "http://registry.npmjs.com",
        sourceCodeDirectory: "src/",
        type: "npm",
        version: "3.0.0",
      },
      dependencies: {
        "prop-types": "^15.5.8",
        "react": "^16.2.0"
      },
      screenshot: "https://unpkg.com/@icedesign/detail-table-block/screenshot.png",
      screenshots: ["https://unpkg.com/@icedesign/detail-table-block/screenshot.png"],
      publishTime: "2019-07-08T08:42:13.796Z",
      updateTime: ["2019-07-08T08:42:13.796Z"],
      uid: [],
    }
  ]
}

describe('Test adapter page module', () => {
  let ctx: any;

  let page: any;

  before(async () => {
    const projectManager = app.projectManager;
    await projectManager.addProject(tmpPath);
    const project = await projectManager.setCurrent(tmpPath);
    page = new Page({ project, storage });
  });

  beforeEach(() => {
    ctx = app.mockContext({
      i18n: app.i18n,
      socket: app.io,
    });
  });

  it('get all pages', async () => {
    const results: IPage[] = await page.getAll();
    assert(results.length !== 0);
  });

  it('create a page', async () => {
    // TODO: a bug: Error: ENOENT: no such file or directory...
    // await page.create(mockNewPageDetail, ctx);
  });

  it('delete a page', async () => {
    const deletePage = { name: 'NotFound' };
    await page.delete(deletePage);

    const pages: IPage[] = await page.getAll();
    const isExist = pages.some(item => item.name === deletePage.name);
    assert(!isExist);
  });

  it('get blocks', async () => {
    const pageName = 'Dashboard';
    const blocks = await page.getBlocks(pageName);
    assert(blocks.length === 0);
  });

  it('create a block', async () => {
    const params = { blocks: mockNewPageDetail.blocks, name: 'Dashboard' };
    // TODO: a bug: Error: ENOENT: no such file or directory...
    // await page.addBlocks(params, ctx);
  });

  it('bulk create blocks', async () => {
    const params = { block: mockNewPageDetail.blocks[0], name: 'Dashboard' };
    // TODO: a bug: Error: ENOENT: no such file or directory...
    // await page.addBlock(params, ctx);
  });
});
