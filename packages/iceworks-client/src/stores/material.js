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

  async getCurrent(url) {
    const firstResource = this.dataSource.resource[0] || {};
    const sourceUrl = url || firstResource.source;

    if (sourceUrl) {
      const data = await socket.emit('material.index.current', { url: sourceUrl });
      logger.info('Material Data:', data);

      this.dataSource.current = data;
    }
  },

  async resetCurrent() {
    this.dataSource.current = {};
  },
};
