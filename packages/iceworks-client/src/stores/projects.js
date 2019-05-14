import socket from '@src/socket';

export default {
  dataSource: [],
  async refresh() {
    try {
      const dataSource = await socket.emit('project.index.list');
      this.dataSource = dataSource;
    } catch (error) {
      // do something...
    }
  },
  add(project) {
    const { dataSource } = this;
    this.dataSource = [].concat(dataSource).concat([{ ...project, id: dataSource.length }]);
  },
  async remove(selectedId) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.dataSource = [].concat(this.dataSource.filter(({ id }) => id !== selectedId));
  },
};
