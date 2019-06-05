import socket from '@src/socket';
import logger from '@utils/logger';

export default {
  dataSource: {
    resource: [],
    current: {},
    recommendScaffolds: [],
  },

  async getRecommendScaffolds() {
    this.dataSource.recommendScaffolds = await socket.emit('material.index.recommendScaffolds');
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
      const data = await socket.emit('material.index.getOne', { url: sourceUrl });
      logger.info('Material Data:', data);

      this.dataSource.current = data;
    }
  },
};
