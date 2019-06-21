import socket from '@src/socket';

export default {
  dataSource: {
    asideMenuConfig: [],
  },
  async refresh() {
    const dataSource = await socket.emit('adapter.menu.getAll');
    this.dataSource = {
      asideMenuConfig: dataSource.asideMenuConfig,
    };
  },
  async bulkCreate(args) {
    await socket.emit('adapter.menu.bulkCreate', args);
  },
};
