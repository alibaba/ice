const request = require('request');
const macaddress = require('macaddress');
const logger = require('./logger');

let userId = 0;
macaddress.one((err, macAddr) => {
  if (!err) {
    // todo get user id when we have a user system
    userId = macAddr;
  }
});

module.exports = {
  record: (data) => {
    const realData = {
      ...data,
      platform: `${process.platform}_${process.arch}`,
      id: userId,
    };

    const dataKeyArray = Object.keys(realData);
    const gokey = dataKeyArray.reduce((finnalStr, currentKey, index) => {
      const currentData = typeof realData[currentKey] === 'string'
        ? realData[currentKey]
        : JSON.stringify(realData[currentKey]);
      return `${finnalStr}${currentKey}=${currentData}${
        dataKeyArray.length - 1 === index ? '' : '&'
      }`;
    }, '');

    logger.info('glodlog request - gokey:', gokey);

    request({
      method: 'POST',
      url: 'http://gm.mmstat.com/iceteam.iceworks.log',
      json: true,
      body: {
        cache: Math.random(),
        gmkey: 'CLK',
        gokey: encodeURIComponent(gokey),
        logtype: '2',
      },
    }, (error, response) => {
      const errorName = 'glodlog-error';
      if (error) {
        error.name = errorName;
        logger.error(error);
      } else if (response.statusCode !== 200) {
        const statusError = new Error('glodlog got error: ', response.statusCode);
        statusError.name = errorName;
        logger.error(statusError);
      } else {
        logger.info('glodlog request - successed');
      }
    });
  },
};
