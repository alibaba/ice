const os = require('os');
const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const util = require('util');
const execa = require('execa');
const { getNpmTarball, getAndExtractTarball } = require('ice-npm-utils');
const shelljs = require('shelljs');

const cliBuilder = require.resolve('electron-builder/out/cli/cli.js');
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
  const buildName = 'build';
  const distName = 'dist';
  const serverName = 'server';
  const buildDir = path.join(__dirname, buildName);
  const distDir = path.join(__dirname, distName);
  const serverDir = path.join(__dirname, serverName);

  async function build() {
    if (fs.existsSync(distDir)) {
      shelljs.rm('-rf', [distName]);
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
    if (isDev) {
      shelljs.cp('-R', '../../packages/iceworks-server/', './server/');
      
      await execa.shell('npm install', {
        stdio: 'inherit',
        cwd: serverDir,
      });
      await execa.shell('npm build', {
        stdio: 'inherit',
        cwd: serverDir,
      });
    } else {
      const tarball = await getNpmTarball('iceworks-server');
      await getAndExtractTarball(serverDir, tarball);
      await execa.shell('npm install', {
        stdio: 'inherit',
        cwd: serverDir,
      });
    }
  }

  async function copyAppFiles() {
    shelljs.cp('-R', './app/', `./${buildName}/`);
  }

  async function setPackage() {
    const packageJSONFileName = 'package.json';
    const projectPackageJSONPath = path.join(__dirname, packageJSONFileName);
    const projectPackageJSON = JSON.parse((await readFileAsync(projectPackageJSONPath)).toString());

    projectPackageJSON.main = './index.js';
    delete projectPackageJSON.build;

    await writeFileAsync(path.join(buildDir, packageJSONFileName), `${JSON.stringify(projectPackageJSON, null, 2)}\n`, 'utf-8');

    await execa.shell('npm install', {
      stdio: 'inherit',
      cwd: buildDir,
    });
  }

  async function dist() {
    if (fs.existsSync(buildDir)) {
      shelljs.rm('-rf', [buildName]);
    }
    shelljs.mkdir('-p', buildName);

    await getServerCode();

    await copyAppFiles();

    await setPackage();

    build();
  }

  dist();
});
