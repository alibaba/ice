const request = require('request');
const macaddress = require('macaddress');

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
      id: userId
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
  
    request({
      method: 'POST',
      url: 'http://gm.mmstat.com/iceteam.iceworks.log',
      data: {
        cache: Math.random(),
        gmkey: 'CLK',
        gokey: encodeURIComponent(gokey),
        logtype: '2',
      },
    });
  }
}