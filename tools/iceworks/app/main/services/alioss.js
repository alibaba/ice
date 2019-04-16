const OSS = require('ali-oss');
const path = require('path');
const logger = require('../logger');

const getOssStore = (options) => {
  const ossStore = new OSS(options);
  ossStore.agent = false;
  return ossStore;
};

const getBuckets = async (options) => {
  const ossStore = getOssStore(options);
  return ossStore.listBuckets().catch((error) => {
    error.name = 'oss-getbuckets-error';
    logger.error(error);
    return Promise.reject(error);
  });
};

const upload2oss = async (options, selectedBucket, bucketDirectory = '/', assets) => {
  const ossStore = getOssStore(options);
  await ossStore.setBucket(selectedBucket);
  return Promise.all(
    assets.map((file) => {
      let storeFilepath = path.join(bucketDirectory, file.path);
      storeFilepath = storeFilepath.replace(/\\/g, '/');
      storeFilepath = storeFilepath.replace(/^\//, '');
      return ossStore.put(storeFilepath, file.fullPath).then((object = {}) => {
        if (object.res && object.res.status === 200) {
          return Promise.resolve({
            code: 0,
            url: object.url,
            path: file.path,
          });
        }
        return Promise.resolve({
          code: 1,
          message: `上传失败，请检查网络连接 (${(object.res
            && object.res.status)
            || 0})。`,
        });
      })
        .catch((error) => {
          error.name = 'oss-upload-error';
          logger.error(error);
          return Promise.resolve({
            code: 1,
            message: error.message,
            path: file.path,
          });
        });
    })
  );
};

module.exports = {
  getBuckets,
  upload2oss,
};
