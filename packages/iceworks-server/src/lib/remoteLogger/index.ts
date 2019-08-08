import * as _ from 'lodash';
import * as request from 'request-promise-native';
import { Transport } from 'egg-logger';

const remoteUrl = `http://iceworks.cn-hangzhou.log.aliyuncs.com/logstores/iceworks-node-log/track`;

export default class RemoteLogger extends Transport {
  // send to remote
  public async log(level, args) {
    const qsData = {
      APIVersion: '0.6.0', // sls required
      __topic__: level, // log type
      node_version: process.version, // eslint-disable-line

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

    try {
      await request({
        url: remoteUrl,
        qs: qsData,
        timeout: 2000,
      });
    } catch (err) {
      // ignore...
    }
  }
}
