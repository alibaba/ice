import socket from '@src/socket';
import { Message } from '@alifd/next';

export default {
  dataSource: {
    cli: [],
  },

  async getCLIConf() {
    this.dataSource.cli = await socket.emit('project.configuration.getCLIConf');
  },

  async setCLIConf(params) {
    const result = await socket.emit('project.configuration.setCLIConf', {
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
