const oss = require('ali-oss');
const co = require('co');
const { readdirSync } = require('fs');
const { resolve, join } = require('path');

const bucket = 'iceworks';
const accessKeyId = process.env.ACCESS_KEY_ID;
const accessKeySecret = process.env.ACCESS_KEY_SECRET;

const store = oss({
  bucket,
  endpoint: 'oss-cn-hangzhou.aliyuncs.com',
  accessKeyId,
  accessKeySecret,
  time: '120s',
});

console.log('start uploading');
const files = readdirSync(resolve(__dirname, '../build')).map((filename) => ({
  from: resolve(__dirname, '../build', filename),
  to: join('assets', filename),
}));

console.log(files);

function createUploadTask(opts) {
  const { from, to } = opts;

  return co(store.put(to, from)).then((object = {}) => {
    if (object.res && object.res.status == 200) {
      console.log('upload ok', object.url);
      return true;
    } else {
      throw new Error('upload err:' + to);
    }
  });
}

const tasks = files.map(createUploadTask);

Promise.all(tasks)
  .then(() => {
    console.log('All Done');
  })
  .catch((err) => {
    console.log('upload err', err);
  });
