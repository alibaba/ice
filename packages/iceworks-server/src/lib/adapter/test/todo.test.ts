import { getProject, storage } from './common';
import Todo from '../modules/todo';

const { assert } = require('midway-mock/bootstrap');

describe('Test adapter todo module', () => {
  let todo: any;

  before(async () => {
    const project = await getProject();
    todo = new Todo({ project, storage })
  });

  it('get todo list', async () => {
    const results = await todo.getList();
    assert(results.length === 0);
  });
})
