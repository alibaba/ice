// TODO：体验需要优化，有没有其他更好的方式
const rp = require('request-promise-native');
const debug = require('debug')('ice:util:innernet');

const INNER_NET_IMG_URL =
  'http://img.daily.taobaocdn.net/tps/TB11DHfX.w7LKJjyzdKXXaShXXa-460-460.png';

async function isInnerNet() {
  try {
    await rp.get(INNER_NET_IMG_URL);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 *
 * @param {String} npmname
 * @returns {Boolean}
 */
function isTnpm(npmname) {
  const is = /^@ali(?:fe)?\//.test(npmname);
  debug('isTnpm %j', {is, npmname});
  return is;
}
module.exports = {
  isInnerNet,
  isTnpm,
};
