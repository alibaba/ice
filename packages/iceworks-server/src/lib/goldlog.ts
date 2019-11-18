import * as request from 'request-promise-native';

export default async function(data) {
  try {
    const dataKeyArray = Object.keys(data);
    const gokey = dataKeyArray.reduce((finalStr, currentKey, index) => {
      const currentData =
          typeof data[currentKey] === 'string'
            ? data[currentKey]
            : JSON.stringify(data[currentKey]);
      return `${finalStr}${currentKey}=${currentData}${
        dataKeyArray.length - 1 === index ? '' : '&'
      }`;
    }, '');

    console.log('glodlog:', gokey);

    await request({
      method: 'post',
      url: 'http://gm.mmstat.com/iceteam.iceworks.log3',
      json: true,
      body: {
        cache: Math.random(),
        gmkey: 'CLK',
        gokey: encodeURIComponent(gokey),
        logtype: '2',
      },
    });
  } catch (error) {
    error.name = 'goldlog-error';
    console.error(error);
  }
}
