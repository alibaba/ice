/**
 * 将 build/docs.json 上传到 oss
 */
const oss = require('ali-oss');
const path = require('path');
const glob = require('glob');

const bucket = 'iceworks';
const accessKeyId = process.env.ACCESS_KEY_ID;
const accessKeySecret = process.env.ACCESS_KEY_SECRET;
const branch = process.env.BRANCH_NAME;
const assetsPath = branch === 'master' ? 'assets' : 'pre-assets';

console.log('ACCESS_KEY_ID:', process.env.ACCESS_KEY_ID);
console.log('ACCESS_KEY_SECRET:', process.env.ACCESS_KEY_SECRET);

if (branch === 'master' || /docs/.test(branch)) {
  const ossClient = oss({
    bucket,
    endpoint: 'oss-cn-hangzhou.aliyuncs.com',
    accessKeyId,
    accessKeySecret,
    time: '120s',
  });

  const baseDir = path.resolve(__dirname, '../build');
  const files = glob.sync('*.json', {
    nodir: true,
    cwd: baseDir,
  });

  const promiseQueue = files.map((file) => {
    const fromPath = path.resolve(baseDir, file);
    const toPath = path.join(assetsPath, 'docs', file);

    console.log('ossput', fromPath, toPath);
    return ossClient.put(toPath, fromPath);
  });

  Promise.all(promiseQueue).then(() => {
    console.log('upload success');
  }).catch(err => {
    console.error('upload error');
    console.error(err);
    process.exit(1);
  });
} else {
  console.log('当前分支非 master/docs*, 不执行文档同步脚本');
  console.log(`BRANCH_NAME=${branch}`);
  process.exit(0);
}
