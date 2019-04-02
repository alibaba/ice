import request from 'request';

export default {
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