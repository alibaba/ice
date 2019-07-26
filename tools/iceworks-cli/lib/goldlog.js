const axios = require('axios');

module.exports = goldlog;

/**
 * Send log records to the aplus website
 *
 * @param {String} action
 * @param {Object} extraData
 */
function goldlog(action, extraData = {}) {
  const realData = {
    action: `iceworks-cli-${action}`,
    data: {
      ...extraData,
    },
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
  });
}
