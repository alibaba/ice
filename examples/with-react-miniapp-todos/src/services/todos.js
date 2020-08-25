import request from 'universal-request';

const URL_PREFIX = 'http://localhost:7001/api/mp';

export default {
  async list ({ openId }) {
    let todos = [];
    try {
      const URL = `${URL_PREFIX}/todos?openId=${openId}`;
      const res = await request({
        url: URL
      });
      todos = res.data.data.todos;
    } catch (err) {
      console.error(err);
    }
    return todos;
  },
  async add ({ content, openId }) {
    let data = {};
    try {
      const res = await request({
        url: `${URL_PREFIX}/todos/add`,
        method: 'POST',
        data: {
          openId,
          content
        }
      });
      data = res.data;
    } catch (err) {
      console.error(err);
    }
    return data;
  },
  async del (id) {
    let data = {};
    try {
      const res = await request({
        url: `${URL_PREFIX}/todos/del/${id}`
      });
      data = res.data;
    } catch (err) {
      console.error(err);
    }
    return data;
  },
  async edit (id, { openId, content }) {
    let data = {};
    try {
      const res = await request({
        url: `${URL_PREFIX}/todos/edit`,
        method: 'POST',
        data: {
          id,
          openId,
          content
        }
      });
      data = res.data;
    } catch (err) {
      console.error(err);
    }
    return data;
  },
  async view (id) {
    let data = {};
    try {
      const res = await request.get(`/todos/view/${id}`);
      data = res.data;
    } catch (err) {
      console.error(err);
    }
    return data;
  },
};
