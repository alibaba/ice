// TODO：体验需要优化，有没有其他更好的方式
const rp = require('request-promise-native');

const INNER_NET_IMG_URL =
  'http://img.daily.taobaocdn.net/tps/TB1T7AtX.w7LKJjyzdKXXaShXXa-2-4.jpg';

async function isInnerNet() {
  try {
    await rp.get(INNER_NET_IMG_URL);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  isInnerNet,
};
