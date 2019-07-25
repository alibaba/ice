const os = require('os');
const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const util = require('util');
const execa = require('execa');
const { getNpmTarball, getAndExtractTarball } = require('ice-npm-utils');
const shelljs = require('shelljs');
const pathExists = require('path-exists');

const cliBuilder = require.resolve('electron-builder/out/cli/cli.js');
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const isDev = process.env.NODE_ENV === 'development';

gulp.task('dist', (done) => {
  console.log('NODE_ENV is dev: ', isDev);

  let target;
  if (os.platform() === 'win32') {
    target = 'win';
  } else {
    target = 'mac';
  }
  const buildName = 'build';
  const distName = 'dist';
  const serverName = 'server';
  const rendererName = 'renderer';
  const buildDir = path.join(__dirname, buildName);
  const distDir = path.join(__dirname, distName);
  const serverDir = path.join(__dirname, serverName);
  const rendererDir = path.join(__dirname, rendererName);

  async function build() {
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
      console.log('打包完成');
      code = 0;
    } catch (error) {
      console.log(error);
      console.error('打包失败');
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

  async function copyAppFiles() {
    if (fs.existsSync(buildDir)) {
      shelljs.rm('-rf', [buildName]);
    }
    shelljs.mkdir('-p', buildName);

    shelljs.cp('-R', './app/*', `./${buildName}/`);
  }

  async function copyRenderFiles() {
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

  async function setPackage() {
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

  async function dist() {
    await getServerCode();

    await copyAppFiles();

    await copyRenderFiles();

    await setPackage();

    build();
  }

  dist();
});
