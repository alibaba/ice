import { request } from 'ice';

async function customFetch (url) {
  const res = await fetch(url);
  return res.json();
}

export default {
  async getRepo(id: number) {
    console.log(id);
    return await customFetch('/api/repo');
  },

  async getUser() {
    return await request('/user');
  },
};
