const electronLog = require('electron-log');
const { app } = require('electron');
const util = require('util');

electronLog.transports.file.level = 'info';
electronLog.transports.file.fileName = 'main.log';
electronLog.transports.file.maxSize = 30 * 1024 * 1024;

// SLS config：配置参照 https://help.aliyun.com/document_detail/31752.html?spm=a2c4g.11186623.6.707.614f8bdceHbp2w&accounttraceid=3835f51f-2862-4a2c-a8e7-fc695d89c700
electronLog.transports.sls = ({data, level}) => {
  const error = level === 'error' ? data[0] : {};
  const message = level !== 'error' ? util.format.apply(util, data) : error.message;

  const project = 'iceworks';
  const logstore = 'iceworks-log';
  const host = 'cn-hangzhou.log.aliyuncs.com';
  let url = `http://${project}.${host}/logstores/${logstore}/track?`;

  // log 基础信息，保留字段, 如果传入参数有这些字段会被覆盖。
  const body = {
    type: error.name,
    error_stack: error.stack,
    error_data: error.data,
    message,
    __topic__: level, // 日志类型
    APIVersion: '0.6.0', // sls 必须的参数
    platform: `${process.platform}_${process.arch}`, // app 信息
    version: app.getVersion(), // iceworks版本信息
  };

  const dataKeyArray = Object.keys(body);
  const param = dataKeyArray.reduce((finnalStr, currentKey, index) => {
    const currentData = typeof body[currentKey] === 'string'
      ? body[currentKey]
      : JSON.stringify(body[currentKey]);
    return `${finnalStr}${currentKey}=${currentData}${dataKeyArray.length - 1 === index ? '' : '&'}`;
  }, '');

  url += param;

  request({
    url,
    timeout: 2000,
  }, () => {
    // do nothing
  });
};
electronLog.transports.sls.level = 'info';

module.exports = electronLog;
