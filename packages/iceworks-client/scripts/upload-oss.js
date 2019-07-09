/* eslint no-console:0 */
/**
 * 将 iceworks-client 静态资源上传到 oss
 */
const path = require('path');
const oss = require('ali-oss');
const glob = require('glob');

const bucket = 'iceworks';
const accessKeyId = process.env.ACCESS_KEY_ID;
const accessKeySecret = process.env.ACCESS_KEY_SECRET;

if (!accessKeyId || !accessKeySecret) {
  console.log('请设置 accessKeyId 和 accessKeySecret 环境变量\n');
  console.log('示例：ACCESS_KEY_ID=xxx ACCESS_KEY_SECRET=xxx npm publush\n');
  process.exit(1);
}

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

// 同步 iceworks-client 静态资源
const clientFromPath = path.join(process.cwd(), 'packages', 'iceworks-client', 'build');
const clientToPath = 'iceworks-client/assets';
uploadAssetsToOSS(clientFromPath, clientToPath, '*/**');

