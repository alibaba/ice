/**
 * 自动重试
 * @param {*} fn 被重试的方法
 * @param {*} maxTryTimes 重试次数
 * @param {*} retryCondition 返回 true 则进入重试逻辑
 */
module.exports = function autoRetry(fn, maxTryTimes, retryCondition) {
  return async function (...args) {
    let tryTimes = 0;
    return await (async function inner() {
      try {
        tryTimes++;
        return await fn(...args);
      } catch (err) {
        if (retryCondition(err) && maxTryTimes > tryTimes) {
          return await inner();
        } else {
          throw err;
        }
      }
    })();
  };
};