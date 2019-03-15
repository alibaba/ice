/**
 * 自动重试
 * @param {*} fn 被重试的方法
 * @param {*} maxTryTimes 重试次数
 * @param {*} errHandler 被重试方法的错误判断逻辑，用于判断什么样的错误才会进入重试逻辑，返回true则进入重试逻辑
 */
module.exports = function autoRetry(fn, maxTryTimes, errHandler) {
  return async function (...args) {
    let tryTimes = 0;
    async function inner() {
      try {
        tryTimes++;
        return await fn(...args);
      } catch (err) {
        if (errHandler && errHandler(err)) return inner();
        if (tryTimes === maxTryTimes) throw err;
        return inner();
      }
    }
    return inner();
  };
};
