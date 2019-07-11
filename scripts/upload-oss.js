/**
 *  将 build/docs.json 上传到 oss
 */
const oss = require('ali-oss');
const path = require('path');
const glob = require('glob');

const bucket = 'iceworks';
const accessKeyId = process.env.ACCESS_KEY_ID;
const accessKeySecret = process.env.ACCESS_KEY_SECRET;
const branch = process.env.TRAVIS_BRANCH;
const cwd = process.cwd();

function uploadAssetsToOSS(fromPath, toPath, globPatterns) {
  const ossClient = oss({
    bucket,
    endpoint: 'oss-cn-hangzhou.aliyuncs.com',
    accessKeyId,
    accessKeySecret,
    time: '120s',
  });

  const files = glob.sync(globPatterns, {
    nodir: true,
    cwd: fromPath,
  });

  const promiseQueue = files.map((file) => {
    const from = path.join(fromPath, file);
    const to = path.join(toPath, file);

    console.log('ossput', `${from} => ${to}`);
    return ossClient.put(to, from);
  });

  Promise.all(promiseQueue).then(() => {
    console.log('upload success');
  });
}

// 同步文档静态资源
if (['master', 'production'].indexOf(branch) !== -1 || /docs/.test(branch)) {
  const docsFromPath = path.join(cwd, 'build');
  const docsToPath = branch === 'production' ? 'assets' : 'pre-assets';
  uploadAssetsToOSS(docsFromPath, docsToPath, '*.json');
} else {
  console.log('当前分支非 master/docs*, 不执行文档同步脚本');
  console.log(`TRAVIS_BRANCH=${branch}`);
  process.exit(0);
}
