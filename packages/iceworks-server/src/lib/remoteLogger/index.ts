import * as _ from 'lodash';
import * as request from 'request';
import { Transport } from 'egg-logger';

const remoteUrl = `http://iceworks.cn-hangzhou.log.aliyuncs.com/logstores/iceworks-node-log/track`;

export default class RemoteLogger extends Transport {
  // 定义 log 方法，在此方法中把日志上报给远端服务
  async log(level, args) {
    const qsData = {
      APIVersion: '0.6.0', // sls 必须的参数
      __topic__: level, // 日志类型
      node_version: process.version,

      message: '',
      name: '',
      stack: '',
    };

    if (args[0] instanceof Error) {
      const error: Error = args[0];
      qsData.message = error.message;
      qsData.name = error.name;
      qsData.stack = error.stack;
    } else {
      const name = _.isString(args[0]) ? args[0] : JSON.stringify(args[0]);
      const message = args[1] ? JSON.stringify(args[1]) : '';
      qsData.name = name;
      qsData.message = message;
    }

    await request({
      url: remoteUrl,
      qs: qsData,
      timeout: 2000
    });
  }
}
