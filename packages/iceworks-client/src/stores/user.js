import socket from '@src/socket';

export default {
  dataSource: null,

  async refresh() {
    this.dataSource = await socket.emit('home.setting.getUser');
  },

  // eslint-disable-next-line camelcase
  async login({ workid, cname, avatar_url }) {
    this.dataSource = await socket.emit('home.setting.setUser', { name: cname, workId: workid, avatarUrl: avatar_url });
  },
};
