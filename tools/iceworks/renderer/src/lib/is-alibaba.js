import request from 'request';

export default function isAlibaba() {
  return new Promise((resolve) => {
    request({
      url:
        'http://img.daily.taobaocdn.net/tps/TB12WD8XEw7LKJjyzdKXXaShXXa-2-2.png',
      timeout: 300,
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
}
