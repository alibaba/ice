import socket from '@src/socket';
import logger from '@utils/logger';

export default {
  dataSource: {
    resource: [],
    currentMaterial: {},
    currentSource: '',
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

  async setCurrentSource(url) {
    this.dataSource.currentSource = url;
  },

  async getCurrentMaterial(url) {
    const firstResource = this.dataSource.resource[0] || {};
    const sourceUrl = url || firstResource.source;

    if (sourceUrl) {
      const data = await socket.emit('material.index.getOne', { url: sourceUrl });
      logger.info('Material Data:', data);

      this.dataSource.currentMaterial = data;
    }
  },

  async addMaterial(url) {
    if (url) {
      const data = await socket.emit('material.index.add', { url });
      logger.info('new resource Data:', data);
      this.dataSource.resource = data.resource;
      this.dataSource.currentSource = url;
      this.dataSource.currentMaterial = data.current;
    }
  },
};
