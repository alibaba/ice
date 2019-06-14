import socket from '@src/socket';
import uid from 'uid';
import traverse from '../../../utils/traverse';

export default {
  dataSource: {
    asideMenuConfig: [],
  },
  async refresh() {
    const dataSource = await socket.emit('project.navigation.list');
    // generate id for every config item
    traverse(dataSource.asideMenuConfig, (node) => {
      const cacheNode = node;
      cacheNode.id = node.id || `Nav_${uid(5)}`;
    });
    this.dataSource = {
      ...dataSource,
    };
  },
  async setData(args) {
    await socket.emit('project.navigation.setData', args);
  },
};
