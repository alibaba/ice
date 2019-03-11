const OSS = require('ali-oss');
const path = require('path');

const getOssStore = (options) => {
  return new Promise((resolve, reject) => {
    try {
      const ossStore = new OSS(options);
      ossStore.agent = false;
      resolve(ossStore);
    } catch (e) {
      reject(e);
    }
  });
};

const getBuckets = async (options) => {
  const ossStore = await getOssStore(options);
  return await ossStore.listBuckets();
}

const upload2oss = async (options, selectedBucket, paths='/', assets) => {
  const ossStore = await getOssStore(options);
  await ossStore.setBucket(selectedBucket);
  return Promise.all(
    assets.map((file) => {
      let storeFilepath = path.join(paths, file.path);
      storeFilepath = storeFilepath.replace(/\\/g, '/');
      storeFilepath = storeFilepath.replace(/^\//, '');
      return ossStore.put(storeFilepath, file.fullPath).then((object = {}) => {
        if (object.res && object.res.status === 200) {
          return Promise.resolve({
            code: 0,
            url: object.url,
            path: file.path,
          });
        } else {
          return Promise.resolve({
            code: 1,
            message: `上传失败，请检查网络连接 (${(object.res &&
              object.res.status) ||
              0})。`,
          });
        }
      })
      .catch((err) => {
        return Promise.resolve({
          code: 1,
          message: err.message,
          path: file.path,
        });
      })
    })
  );
}

module.exports = {
  getBuckets,
  upload2oss
};