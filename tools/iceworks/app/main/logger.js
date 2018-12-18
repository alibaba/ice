const axios = require('axios');
const electronLog = require('electron-log');
const is = require('electron-is');
const macaddress = require('macaddress');

const isDev = is.windows();

let userId = 0;

macaddress.one((err, macAddr) => {
  if (!err) {
    // todo get user id when we have a user system
    userId = macAddr;
  }
});
let log;

if (isDev) {
  log = console;
} else {
  log = electronLog;
  log.transports.file.level = 'silly'; // 开启完整的日志模式
  log.transports.file.maxSize = 30 * 1024 * 1024;
}

function logger(type, ...args) {
  if (isDev) {
    args.unshift(`[${type}]`);
  }
  const logFunc = log[type] || log.info;
  logFunc.apply(null, args);
}

const uploadLog = () => {
  // TODO: load and parse electron logger txt but cannot find location
};

/**
 * 发送日志埋点，记录到 aplus 平台
 * @param {String} type 记录日志类型
 * @param {Object} data gokey
 */
const report = (type, data = {}) => {
  const realData = {
    platform: process.platform + '_' + process.arch,
    id: userId,
    type,
  };

  if (data.action) {
    realData.action = data.action;
    delete data.action;
  }

  if (Object.keys(data).length > 0) {
    realData.data = data;
  }

  const dataKeyArray = Object.keys(realData);

  const gokey = dataKeyArray.reduce((finnalStr, currentKey, index) => {
    const currentData =
      typeof realData[currentKey] === 'string'
        ? realData[currentKey]
        : JSON.stringify(realData[currentKey]);
    return `${finnalStr}${currentKey}=${currentData}${
      dataKeyArray.length - 1 === index ? '' : '&'
    }`;
  }, '');

  axios({
    method: 'post',
    url: 'http://gm.mmstat.com/iceteam.iceworks.log',
    data: {
      cache: Math.random(),
      gmkey: 'CLK',
      gokey: encodeURIComponent(gokey),
      logtype: '2',
    },
  })
    .then(() => {})
    .catch(() => {});
};

module.exports = {
  report,
  uploadLog,
  debug: logger.bind(null, 'debug'),
  error: logger.bind(null, 'error'),
  info: logger.bind(null, 'info'),
  verbose: logger.bind(null, 'verbose'),
  warn: logger.bind(null, 'warn'),
};
