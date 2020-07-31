import { request } from 'ice';

export default {
  async test () {
    return await request('https://github.com/alibaba/ice');
  }
};
