import socket from '@src/socket';

export default {
  dataSource: {
    asideMenuConfig: [],
    headerMenuConfig: [],
  },
  async refresh() {
    const dataSource = await socket.emit('project.menu.list');
    this.dataSource = {
      asideMenuConfig: dataSource.asideMenuConfig,
      headerMenuConfig: dataSource.headerMenuConfig,
    };
  },
  async bulkCreate(args) {
    await socket.emit('project.menu.bulkCreate', args);
  },
};
