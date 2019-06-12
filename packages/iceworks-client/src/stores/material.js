import socket from '@src/socket';
import logger from '@utils/logger';

function formatResource(data) {
  const official = [];
  const custom = [];

  if (Array.isArray(data)) {
    data.forEach(item => {
      if (item.official) {
        official.push(item);
      } else {
        custom.push(item);
      }
    });
  }
  return { official, custom };
}

export default {
  dataSource: {
    resource: {
      official: [],
      custom: [],
    },
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

    this.dataSource.resource = formatResource(data);
  },

  async setCurrentSource(url) {
    this.dataSource.currentSource = url;
  },

  async getCurrentMaterial(url) {
    const firstResource = this.dataSource.resource[0] || {};
    const sourceUrl = url || firstResource.source;
    const data = await socket.emit('material.index.getOne', { url: sourceUrl });
    logger.info('Material Data:', data);

    this.dataSource.currentMaterial = data;
  },

  async addMaterial(url) {
    const data = await socket.emit('material.index.add', { url });
    logger.info('new resource Data:', data);
    this.dataSource.resource = formatResource(data.resource);
    this.dataSource.currentSource = url;
    this.dataSource.currentMaterial = data.current;
  },

  async deleteMaterial(url) {
    const data = await socket.emit('material.index.delete', { url });
    logger.info('new resource Data:', data);
    this.dataSource.resource = formatResource(data);
  },
};
