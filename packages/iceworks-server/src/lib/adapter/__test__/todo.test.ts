import { project, storage, tmpPath } from './common';
import Todo from '../modules/todo';
import * as util from 'util';
import * as rimraf from 'rimraf';

const { assert } = require('midway-mock/bootstrap');

describe('Test adapter todo module', () => {
  const todo = new Todo({ project, storage });;

  it('get todo list', async () => {
    const results = await todo.getList();
    assert.strictEqual(results.length, 0);
  });

  after(async () => {
    const rimrafAsync = util.promisify(rimraf);
    await rimrafAsync(tmpPath);
  });
})
