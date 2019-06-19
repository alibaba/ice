import socket from '@src/socket';

export default {
  asideMenuConfig: [],
  headerMenuConfig: [],
  async refresh() {
    const dataSource = await socket.emit('project.menu.list');
    this.asideMenuConfig = dataSource.asideMenuConfig;
    this.headerMenuConfig = dataSource.headerMenuConfig;
  },
  async bulkCreate(args) {
    await socket.emit('project.menu.bulkCreate', args);
  },
};
