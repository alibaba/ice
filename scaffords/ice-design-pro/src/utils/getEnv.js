/**
 * 根据域名判断并返回四套环境的方法
 * import env from './utils/env';
 * console.log(env); // -> local or daily or prepub or production
 */
export default (function () {
  const location = window.location;
  if (/\d+\.\d+\.\d+|localhost/.test(location.host)) {
    return 'local';
  } else if (/daily\.taobao\.net/.test(location.host)) {
    return 'daily';
  } else if (/pre[.-](\w+)\.taobao\.com/.test(location.host)) {
    return 'prepub';
  }
  return 'production';
}());
