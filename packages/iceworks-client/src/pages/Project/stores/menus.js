import socket from '@src/socket';

export default {
  dataSource: {
    asideMenuConfig: [],
  },
  async refresh() {
    const dataSource = await socket.emit('project.menu.list');
    this.dataSource = {
      ...dataSource,
    };
  },
  async bulkCreate(args) {
    await socket.emit('project.menu.bulkCreate', args);
  },
};
