import * as util from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { storage, tmpPath } from './common';
import Todo from '../../../src/lib/adapter/modules/todo';

const { assert, app } = require('midway-mock/bootstrap');
const writeFileAsync = util.promisify(fs.writeFile);

describe('Test adapter todo module', () => {
  let todo: any;

  before(async () => {
    const projectManager = app.projectManager;
    await projectManager.addProject(tmpPath);
    const project = await projectManager.setCurrent(tmpPath);
    todo = new Todo({ project, storage });

    // mock data: add todo detail
    writeFileAsync(path.join(tmpPath, 'test.js'), '// TODO test adapter todo module');
  });

  it('get todo list', async () => {
    const result = await todo.getList();
    assert(result.length === 1);
    const todoDetail = result[0].messages[0];
    assert(todoDetail.content === 'test adapter todo module');
    assert(todoDetail.type === 'TODO');
  });
})
