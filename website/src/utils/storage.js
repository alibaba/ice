export default {
  get: (key) => {
    const result = window.localStorage.getItem(key);

    if (result === null) {
      return null;
    }

    try {
      const { value, validTime, writeTime } = JSON.parse(result);
      if (Date.now() - writeTime > validTime) {
        // 已过期
        window.localStorage.removeItem(key);
        return null;
      }

      return value;
    } catch (err) {
      console.error('storage.get error', err);
      // 清除掉不合法数据，防止持续报错
      window.localStorage.removeItem(key);
      return null;
    }
  },

  /**
   * 写入
   * @param {String} key
   * @param {String} value
   * @param {String} validTime 有效时间，单位 ms
   */
  set: (key, value, validTime) => {
    window.localStorage.setItem(
      key,
      JSON.stringify({
        value,
        validTime,
        writeTime: Date.now(),
      }),
    );
  },
};
