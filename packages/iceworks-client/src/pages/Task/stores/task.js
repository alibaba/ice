import socket from '@src/socket';
import { Message } from '@alifd/next';

export default {
  dataSource: {},

  async start(type) {
    await socket.emit('project.task.start', { command: type });
  },

  async stop(type) {
    await socket.emit('project.task.stop', { command: type });
  },

  async getConf(type) {
    this.dataSource[type] = await socket.emit('project.task.getConf', {
      command: type,
    });
  },

  async setConf(type, params) {
    const result = await socket.emit('project.task.setConf', {
      command: type,
      options: params,
    });

    if (result.success) {
      Message.show({
        type: 'success',
        title: '提示',
        content: '配置修改成功',
        align: 'tr tr',
      });
    } else {
      Message.show({
        type: 'error',
        title: '提示',
        content: '配置设置失败',
        align: 'tr tr',
      });
    }
  },
};
