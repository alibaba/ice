/**
 * 将 build/docs.json 上传到 oss
 */
const oss = require('ali-oss');
const path = require('path');

const bucket = 'iceworks';
const accessKeyId = process.env.ACCESS_KEY_ID;
const accessKeySecret = process.env.ACCESS_KEY_SECRET;
const branch = process.env.TRAVIS_BRANCH;
const assetsPath = branch === 'production' ? 'assets' : 'pre-assets';

if (['master', 'production'].indexOf(branch) === -1) {
  console.log('当前分支非 master/production, 不执行物料源同步脚本');
  console.log(`TRAVIS_BRANCH=${branch}`);
  process.exit(0);
}

const ossClient = oss({
  bucket,
  endpoint: 'oss-cn-hangzhou.aliyuncs.com',
  accessKeyId,
  accessKeySecret,
  time: '120s',
});

const fromPath = path.resolve(__dirname, '../build/docs.json');
const toPath = path.join(assetsPath, 'docs.json');

console.log('start upload oss', fromPath, toPath);

ossClient.put(toPath, fromPath).then((result) => {
  console.log('upload success', result);
});
