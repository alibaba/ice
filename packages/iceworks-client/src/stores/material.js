import socket from '@src/socket';
import logger from '@utils/logger';

export default {
  dataSource: {
    resource: [],
    current: {},
  },

  async getResource() {
    const data = await socket.emit('material.index.resource');
    logger.info('resource Data:', data);
    this.dataSource.resource = data;
  },

  async getCurrent() {
    const data = await socket.emit('material.index.current');
    logger.info('Material Data:', data);
    this.dataSource.current = data;
  },
};
