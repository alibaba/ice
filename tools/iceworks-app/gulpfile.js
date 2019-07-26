const os = require('os');
const gulp = require('gulp');
const gutil = require('gulp-util');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const util = require('util');
const execa = require('execa');
const co = require('co');
const oss = require('ali-oss');
const { getNpmTarball, getAndExtractTarball } = require('ice-npm-utils');
const shelljs = require('shelljs');
const pathExists = require('path-exists');
const appPkg = require('./package.json');

const cliBuilder = require.resolve('electron-builder/out/cli/cli.js');

const productName = appPkg.name;
const colors = gutil.colors;
const isMac = process.platform === 'darwin';
const isWin32X64 = process.platform === 'win32' && process.arch === 'x64';
const isLinuxX64 = process.platform === 'linux' && process.arch === 'x64';
const isDev = process.env.NODE_ENV === 'development';
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

// code directory
const distName = 'dist';
const buildName = 'build';
const serverName = 'server';
const rendererName = 'renderer';
const buildDir = path.join(__dirname, buildName);
const distDir = path.join(__dirname, distName);
const serverDir = path.join(__dirname, serverName);
const rendererDir = path.join(__dirname, rendererName);

gulp.task('dist', (done) => {
  gutil.log('NODE_ENV is dev: ', isDev);

  let target;
  if (os.platform() === 'win32') {
    target = 'win';
  } else {
    target = 'mac';
  }

  async function buildApp() {
    if (fs.existsSync(distDir)) {
      shelljs.rm('-rf', [distName]);
    }

    const params = [`--${target}`, '--publish', 'always'];
    let code;
    try {
      await execa(
        cliBuilder,
        params,
        { stdio: 'inherit' }
      );
      gutil.log('打包完成');
      code = 0;
    } catch (error) {
      gutil.log(error);
      gutil.error('打包失败');
      code = 1;
    }
 
    done(code);
  }

  async function getServerCode() {
    if (fs.existsSync(serverDir)) {
      shelljs.rm('-rf', [serverName]);
    }
    shelljs.mkdir('-p', serverName);

    if (isDev) {
      shelljs.cp('-R', '../../packages/iceworks-server/*', './server/');

      if (!await pathExists(path.join(serverDir, 'node_modules'))) {
        await execa('npm', ['install'], {
          stdio: 'inherit',
          cwd: serverDir,
          env: process.env,
        });
      }
      
      await execa('npm', ['run', 'build'], {
        stdio: 'inherit',
        cwd: serverDir,
        env: process.env,
      });
    } else {
      const tarball = await getNpmTarball('iceworks-server');
      await getAndExtractTarball(serverDir, tarball);
      await execa('npm', ['install'], {
        stdio: 'inherit',
        cwd: serverDir,
        env: process.env,
      });
    }
  }

  async function packAppDir() {
    if (fs.existsSync(buildDir)) {
      shelljs.rm('-rf', [buildName]);
    }
    shelljs.mkdir('-p', buildName);

    shelljs.cp('-R', './app/*', `./${buildName}/`);

    const packageJSONFileName = 'package.json';
    const projectPackageJSONPath = path.join(__dirname, packageJSONFileName);
    const projectPackageJSON = JSON.parse((await readFileAsync(projectPackageJSONPath)).toString());

    projectPackageJSON.main = './index.js';
    delete projectPackageJSON.build;

    await writeFileAsync(path.join(buildDir, packageJSONFileName), `${JSON.stringify(projectPackageJSON, null, 2)}\n`, 'utf-8');

    await execa('npm', ['install'], {
      stdio: 'inherit',
      cwd: buildDir,
      env: process.env,
    });
  }

  async function packRendererDir() {
    if (!isDev) {
      await execa('npm', ['install'], {
        stdio: 'inherit',
        cwd: rendererDir,
        env: process.env,
      });
    }
    
    await execa('npm', ['run', 'build'], {
      stdio: 'inherit',
      cwd: rendererDir,
      env: process.env,
    });

    const publicDir = `./${buildName}/public/`;
    shelljs.mkdir('-p', publicDir);
    shelljs.cp('-R', `./${rendererName}/build/*`, publicDir);
  }

  async function dist() {
    await getServerCode();

    await packAppDir();

    await packRendererDir();

    buildApp();
  }

  dist();
});

async function getUpload2oss() {
  gutil.log('Access Key 请在 oss 平台查询');
  const accessKey = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: '请输入 Access KeyId (默认值读取: process.env.ACCESS_KEY)',
      default: process.env.ACCESS_KEY || '',
    },
    {
      type: 'input',
      name: 'secret',
      message: '请输入 Access Key Secret (默认值读取: process.env.SECRET)',
      default: process.env.SECRET || '',
    },
    {
      name: 'bucket',
      type: 'list',
      choices: ['iceworks', 'iceworks-beta', 'iceworks-next'],
      message: '请选择 bucket',
    },
  ]);

  const iceworksStore = oss({
    bucket: accessKey.bucket,
    endpoint: 'oss-cn-hangzhou.aliyuncs.com',
    accessKeyId: accessKey.id,
    accessKeySecret: accessKey.secret,
    time: '120s',
  });

  return async function(paths, file) {
    if (!pathExists.sync(file)) {
      gutil.log(colors.red('不存在文件'), file);
      return 1;
    }
  
    gutil.log(
      colors.yellow('开始上传'),
      path.relative(__dirname, file),
      '=>',
      paths.join('/')
    );

    return co(iceworksStore.put(paths.join('/'), file))
      .then((object = {}) => {
        if (object.res && object.res.status === 200) {
          gutil.log(colors.green('上传成功'), object.url);
          return 0;
        }
        gutil.log(colors.red('上传失败'), file);
        return 1;
      })
      .catch(() => {
        gutil.log(colors.red('上传失败'), file);
        return 1;
      });
  };
}

gulp.task('upload-app', async () => {
  const upload2oss = await getUpload2oss();

  // eslint-disable-next-line
  const version = require(`./${buildName}/package.json`).version;

  let channel = 'latest';
  const versionPatch = version.split('.')[2];
  if (versionPatch.indexOf('-') !== -1) {
    channel = versionPatch.split('-')[1];
  }

  gutil.log('channel', channel);

  let files = [];
  let platformName = '';
  if (isMac) {
    files = [
      `${productName}-${version}.dmg`,
      `${productName}-${version}-mac.zip`,
      `${channel}-mac.yml`,
    ];
    platformName = 'mac';
  } else if (isWin32X64) {
    files = [`${productName}-setup-${version}.exe`, `${channel}.yml`];
    platformName = 'win';
  } else if (isLinuxX64) {
    files = [
      `${productName}-amd64-${version}.deb`,
      `${productName}-x86_64-${version}.AppImage`,
      `${channel}-linux.yml`,
    ];
    platformName = 'linux';
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const name of files) {
    const filepath = path.join(distDir, name);
    // eslint-disable-next-line no-await-in-loop
    const code = await upload2oss(['3.0', platformName, name], filepath);
    if (code !== 0) {
      break;
    }
  }
});

gulp.task('upload-logs', async () => {
  const upload2oss = await getUpload2oss();
  // eslint-disable-next-line global-require
  const version = require('./build/package.json').version;
  const filepaths = [
    {
      from: `changelog/${version}.json`,
      to: [`changelog/${version}.json`],
    },
  ];

  filepaths.forEach(async (filepath) => {
    const fromDir = path.join(__dirname, filepath.from);
    const code = await upload2oss(filepath.to, fromDir);
    if (code !== 0) {
      gutil.log(colors.red(`${fromDir} => ${filepath.to.join('/')} error`));
    }
  });
});