const request = require('request');

module.exports = {
  /**
   * 判断用户是否在 alibaba 网络环境
   */
  isAlibaba() {
    return new Promise((resolve) => {
      request({
        url:
          'http://img.daily.taobaocdn.net/tps/TB12WD8XEw7LKJjyzdKXXaShXXa-2-2.png',
        timeout: 1000,
      })
        .on('response', function(response) {
          if (response.statusCode === 200) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .on('error', () => {
          resolve(false);
        });
    });
  },
};
