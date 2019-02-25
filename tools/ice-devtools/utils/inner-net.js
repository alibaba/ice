// TODO：体验需要优化，有没有其他更好的方式
const rp = require('request-promise-native');
const debug = require('debug')('ice:util:innernet');

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

function getRegistry(npmname) {
  if (isTnpm(npmname)) {
    return 'http://registry.npm.alibaba-inc.com';
  }
  return 'http://registry.npmjs.org';
}

function getNpmScope(npmname) {
  const scopeMatch = /(@ali?\w+)\/(\w+)/g.exec(npmname);
  const scope = scopeMatch? scopeMatch[1] : null;
  return scope;
}

module.exports = {
  isInnerNet,
  isTnpm,
  getNpmScope,
  getRegistry
};
