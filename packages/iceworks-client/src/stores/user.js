import socket from '@src/socket';

export default {
  dataSource: null,

  async refresh() {
    this.dataSource = await socket.emit('home.setting.getUser');
  },

  async login({ workid, cname, avatar_url: avatarUrl }) {
    this.dataSource = await socket.emit('home.setting.setUser', {
      name: cname,
      workId: workid,
      avatarUrl,
    });
  },
};
