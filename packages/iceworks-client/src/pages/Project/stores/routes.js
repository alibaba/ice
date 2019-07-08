import socket from '@src/socket';

export default {
  dataSource: [],
  deletePaths: [],

  async refresh() {
    this.dataSource = await socket.emit('adapter.router.getAll');
  },
  addChildRoute(dataSource, value) {
    dataSource.push(value);
  },
  deleteChildRoute(parentChildren, deleteIndex) {
    parentChildren.splice(deleteIndex, 1);
  },
  /* eslint no-param-reassign: 0 */
  editRoute(parentChildren, editIndex, value) {
    parentChildren[editIndex] = value;
  },
  async bulkCreate(args) {
    await socket.emit('adapter.router.bulkCreate', args);
  },
  async delete(args) {
    this.deletePaths = await socket.emit('adapter.router.delete', args);
  },
};
