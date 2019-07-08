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
  editRoute(parentChildren, editIndex, value) {
    const localChildren = parentChildren;
    localChildren[editIndex] = value;
  },
  async bulkCreate(args) {
    await socket.emit('adapter.router.bulkCreate', args);
  },
  async delete(args) {
    this.deletePaths = await socket.emit('adapter.router.delete', args);
  },
};
