import socket from '@src/socket';

export default {
  dataSource: [],
  deletePaths: [],

  async refresh() {
    this.dataSource = await socket.emit('adapter.router.getAll');
  },
  addRoute(createParentIndex, value) {
    const parentChildren = createParentIndex !== -1 ?
      this.dataSource[createParentIndex].children : this.dataSource;
    parentChildren.push(value);
  },
  deleteRoute(deleteIndex, deleteParentIndex) {
    const parentChildren = deleteParentIndex !== -1 ?
      this.dataSource[deleteParentIndex].children : this.dataSource;
    parentChildren.splice(deleteIndex, 1);
  },

  editRoute(editIndex, editParentIndex, value) {
    const parentChildren = editParentIndex !== -1 ?
      this.dataSource[editParentIndex].children : this.dataSource;
    parentChildren[editIndex] = value;
  },
  async bulkCreate(args) {
    await socket.emit('adapter.router.bulkCreate', args);
  },
  async delete(args) {
    this.deletePaths = await socket.emit('adapter.router.delete', args);
  },
};
