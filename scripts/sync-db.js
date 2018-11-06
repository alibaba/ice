const oss = require('ali-oss');
const co = require('co');
const { readdirSync, readFileSync, writeFile } = require('fs');
const path = require('path');
const scaffolds = require('./scaffolds');

if (
  process.env.TRAVIS_BRANCH !== 'master' &&
  process.env.TRAVIS_BRANCH !== 'beta' &&
  process.env.TRAVIS_BRANCH !== 'pre-depoly'
) {
  console.log('当前分支非 Master, 不执行物料源同步脚本');
  console.log(`TRAVIS_BRANCH=${process.env.TRAVIS_BRANCH}`);
  process.exit(0);
}

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

const assetsMap = {
  'pre-depoly': 'pre-assets',
  beta: 'beta-assets',
  master: 'assets',
};

console.log('start uploading');
sortScaffoldMaterials()
  .then(() => {
    const files = readdirSync(path.resolve(__dirname, '../build')).map(
      (filename) => ({
        from: path.resolve(__dirname, '../build', filename),
        to: path.join(assetsMap[process.env.TRAVIS_BRANCH], filename),
      })
    );

    const tasks = files.map(createUploadTask);

    Promise.all(tasks)
      .then(() => {
        console.log('All Done');
      })
      .catch((err) => {
        console.log('upload err', err);
      });
  })
  .catch((err) => {
    console.log('sort err', err);
  });

/**
 * 按照下载量进行排序推荐
 */
function sortScaffoldMaterials() {
  return new Promise((resolve, reject) => {
    const materialsPath = path.join(
      __dirname,
      '../build',
      'react-materials.json'
    );
    const materialsData = JSON.parse(readFileSync(materialsPath, 'utf-8'));

    const sortMaterialsData = [];
    scaffolds.forEach((scaffold) => {
      materialsData.scaffolds.forEach((currentItem) => {
        if (currentItem.name === scaffold) {
          sortMaterialsData.push(currentItem);
        }
      });
    });

    materialsData.scaffolds = sortMaterialsData;

    return writeFile(
      materialsPath,
      JSON.stringify(materialsData, null, 2),
      'utf-8',
      (err) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
}

/**
 * 上传任务
 * @param {object} opts
 */
function createUploadTask(opts) {
  const { from, to } = opts;

  return co(store.put(to, from)).then((object = {}) => {
    if (object.res && object.res.status === 200) {
      console.log('upload ok', object.url);
      return true;
    }
    throw new Error(`upload err:${to}`);
  });
}
