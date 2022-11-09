import { request } from 'ice';

const service = {
  async getUser() {
    return await request('/api/user');
  },

  async getRepo(id) {
    return await request(`/api/repo/${id}`);
  },

  async getDetail(params) {
    const data = await request({
      url: '/api/detail',
      params,
    });

    return data.map(item => {
      return {
        ...item,
        price: item.oldPrice,
        text: item.status === '1' ? '确定' : '取消',
      };
    });
  },
};
export default service;
