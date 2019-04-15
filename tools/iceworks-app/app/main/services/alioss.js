const OSS = require('ali-oss');
const path = require('path');
const alilog = require('../alilog');
const log = require('../logger');

const getOssStore = (options) => {
  const ossStore = new OSS(options);
  ossStore.agent = false;
  return ossStore;
};

const getBuckets = async (options) => {
  const ossStore = getOssStore(options);
  return ossStore.listBuckets().catch((err) => {
    alilog.report({
      type: 'oss-getbuckets-error',
      msg: err.message,
      stack: err.stack,
    }, 'error');
    log.error('oss-getbuckets-error:', err);
    return Promise.reject(err);
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
          message: `上传失败，请检查网络连接 (${(object.res &&
              object.res.status) ||
              0})。`,
        });
      })
        .catch((err) => {
          alilog.report({
            type: 'oss-upload-error',
            msg: err.message,
            stack: err.stack,
          }, 'error');
          log.error('oss-upload-error:', err);
          return Promise.resolve({
            code: 1,
            message: err.message,
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
