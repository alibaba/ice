import socket from '@src/socket';

export default {
  asideMenuConfig: [],
  headerMenuConfig: [],
  async refresh() {
    const dataSource = await socket.emit('adapter.menu.getAll');
    this.asideMenuConfig = dataSource.asideMenuConfig;
    this.headerMenuConfig = dataSource.headerMenuConfig;
  },
  async bulkCreate(args) {
    await socket.emit('adapter.menu.bulkCreate', args);
  },
  async delete(args) {
    await socket.emit('adapter.menu.delete', args);
  },
};
