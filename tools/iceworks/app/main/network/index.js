const request = require('request');

module.exports = {
  /**
   * 判断用户是否在 alibaba 网络环境
   */
  isAlibaba() {
    return new Promise((resolve) => {
      request({
        url: 'https://ice.alibaba-inc.com/check.node',
        timeout: 1000,
      }, function (error, response, body) {
        if (error) {
          resolve(false);
        } else if (response.statusCode === 200 && /success/.test(body)) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    });
  },
};
