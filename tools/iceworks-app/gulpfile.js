const os = require('os');
const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const util = require('util');
const rimraf = require('rimraf');
const execa = require('execa');
const { getNpmTarball, getAndExtractTarball } = require('ice-npm-utils');
const mkdirp = require('mkdirp');
const filecopy = require('filecopy');

const cliBuilder = require.resolve('electron-builder/out/cli/cli.js');
const rimrafAsync = util.promisify(rimraf);
const mkdirpAsync = util.promisify(mkdirp);
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const isDev = process.env.NODE_ENV === 'development';

gulp.task('dist', (done) => {
  let target;
  if (os.platform() === 'win32') {
    target = 'win';
  } else {
    target = 'mac';
  }
  const buildDir = path.join(__dirname, 'build');
  const distDir = path.join(__dirname, 'dist');

  async function copyFiles() {
    await filecopy(
      'app/*',
      'build'
    );
  }

  async function build() {
    if (fs.existsSync(distDir)) {
      await rimrafAsync(distDir);
    }

    const params = [`--${target}`, '--publish', 'always'];
    const childProcess = execa(
      cliBuilder,
      params,
      { stdio: 'inherit' }
    );
    childProcess.on('close', (code) => {
      if (code === 0) {
        console.log('打包完成');
      } else {
        console.error('打包失败');
      }
      done(code);
    });
  }

  async function getServerCode() {
    const serverDir = path.join(buildDir, 'server');
    const tarball = await getNpmTarball('iceworks-server');
    await getAndExtractTarball(serverDir, tarball);
    await execa.shell('npm install', {
      stdio: 'inherit',
      cwd: serverDir,
    });
  }

  async function setPackage() {
    const packageJSONFileName = 'package.json';
    const packageJSONPath = path.join(__dirname, packageJSONFileName);
    const packageJSON = JSON.parse((await readFileAsync(packageJSONPath)).toString());

    packageJSON.main = './index.js';
    delete packageJSON.build;

    await writeFileAsync(path.join(buildDir, packageJSONFileName), `${JSON.stringify(packageJSON, null, 2)}\n`, 'utf-8');

    await execa.shell('npm install', {
      stdio: 'inherit',
      cwd: buildDir,
    });
  }

  async function devDist() {
    await copyFiles();

    await setPackage();

    build();
  }

  async function dist() {
    if (fs.existsSync(buildDir)) {
      await rimrafAsync(buildDir);
    }
    await mkdirpAsync(buildDir);

    await getServerCode();

    await copyFiles();

    await setPackage();

    build();
  }

  if (isDev) {
    devDist();
  } else {
    dist();
  }
});
