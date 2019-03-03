const pkgData = require('../package.json');
const axios = require('axios');

module.exports = goldlog;

/**
 * 发送日志埋点，记录到 aplus 平台
 *
 * @param {String} action 类型
 * @param {Object} extraData 其他参数
 */
function goldlog(action, extraData = {}) {
  const realData = {
    action: `ice-devtools-${action}`,
    data: {
      ...extraData,
      // 这里可以加一些全局参数
    }
  };

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
  }).then(() => {
  }).catch((err) => {
  });
};
