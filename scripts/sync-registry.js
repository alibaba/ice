const rp = require('request-promise');
console.log('ok')

rp({ uri: 'http://registry.npm.taobao.org/@icedesign/scafford-lite/latest', json: true, })
  .then((response) => {
    console.log(response);
  });


