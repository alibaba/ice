import { request } from 'ice';

export default {
  async getRepo(params = {id: 0}) {
    return await request({
      url: '/repo',
      params
    })
  },
}
