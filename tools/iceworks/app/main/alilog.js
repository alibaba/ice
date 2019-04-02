const request = require('request');
const { app } = require('electron');
const logger = require('./logger');

/**
 * 阿里云 SLS 服务，日志上报方法
 * @param {string} topic 类型：info / error
 * @param {object} data 健值参数
 *  data = {
 *    type: '', // 标识具体action /
 * }
 */
const report = (data = {}, topic = 'info') => {
  // SLS config：配置参照 https://help.aliyun.com/document_detail/31752.html?spm=a2c4g.11186623.6.707.614f8bdceHbp2w&accounttraceid=3835f51f-2862-4a2c-a8e7-fc695d89c700
  const project = 'iceworks';
  const logstore = 'iceworks-log';
  const host = 'cn-hangzhou.log.aliyuncs.com';
  let url = `http://${project}.${host}/logstores/${logstore}/track?`;
  // log 基础信息，保留字段, 如果传入参数有这些字段会被覆盖。
  const baseData = {
    __topic__: topic, // 日志类型
    APIVersion: '0.6.0', // sls 必须的参数
    platform: `${process.platform}_${process.arch}`, // app 信息
    version: app.getVersion(), // iceworks版本信息
  };

  // 构造参数
  const totalData = Object.assign(data, baseData);
  const dataKeyArray = Object.keys(totalData);
  const param = dataKeyArray.reduce((finnalStr, currentKey, index) => {
    const currentData = typeof totalData[currentKey] === 'string'
      ? totalData[currentKey]
      : JSON.stringify(totalData[currentKey]);
    return `${finnalStr}${currentKey}=${currentData}${dataKeyArray.length - 1 === index ? '' : '&'}`;
  }, '');

  url += param;

  request({
    url,
    timeout: 2000,
  }, (err) => {
    if (err) {
      logger.error(err);
    }
  });
};

module.exports = {
  report,
};
