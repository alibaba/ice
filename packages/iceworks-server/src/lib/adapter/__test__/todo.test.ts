import { project, storage } from './common';
import Todo from '../modules/todo';

const { app, assert } = require('midway-mock/bootstrap');

describe('Test adapter todo module', () => {
  let ctx: any;
  let todo: any;

  before(() => {
    todo = new Todo({ project, storage });
  });

  beforeEach(() => {
    ctx = app.mockContext({ i18n: app.i18n });
  })

  it('get todo list', async () => {
    const results = await todo.getList();
    assert(results.length === 0);
  })
})
