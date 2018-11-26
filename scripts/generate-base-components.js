/* eslint class-methods-use-this: 0, import/no-dynamic-require:0 */
const path = require('path');
const fs = require('fs');
const spawn = require('cross-spawn');
const rimraf = require('rimraf');
const ora = require('ora');

const cwd = process.cwd();
const defaultOptions = {
  name: '@icedesign/base',
  version: '1.9.15',
  keywords: ['ice'],
  homepage: 'https://alibaba.github.io/ice/component',
  repoUrl: 'https://github.com/alibaba-fusion/next',
  tmpDir: path.join(__dirname, '../.tmp'),
};

class GenerateBaseComponents {
  constructor(options = defaultOptions) {
    this.name = options.name;
    this.version = options.version;
    this.keywords = options.keywords;
    this.homepage = options.homepage;
    this.repoUrl = options.repoUrl;
    this.tmpDir = options.tmpDir;

    // this.rimrafTmpDir();
    // this.formatPackJsonCode();
  }

  rimrafTmpDir() {
    if (fs.existsSync(this.tmpDir)) {
      rimraf(this.tmpDir, () => {
        console.log('清理临时目录完成');
      });
    }
  }

  spawnFn(command, args, options, oraConfig) {
    const defaults = { stdio: 'inherit', cwd: this.tmpDir };
    const spinner = ora(Object.assign({ text: '' }, oraConfig));

    spinner.start();

    return new Promise((resolve, reject) => {
      const child = spawn(command, args, Object.assign(defaults, options));
      child.on('exit', (code) => {
        spinner.stop();
        if (code !== 0) {
          reject(new Error(code));
        }
        resolve(code);
      });
    });
  }

  spawnGitClone() {
    this.spawnFn(
      'git',
      [
        'clone',
        '--branch',
        this.version,
        this.repoUrl,
        '--depth=1',
        this.tmpDir,
      ],
      { cwd },
      {
        text: '  git clone',
      }
    );
  }

  spawnInstallDeps() {
    this.spawnFn(
      'tnpm',
      ['install', '--loglevel', 'error'],
      {},
      { text: '  tnpm install' }
    );
  }

  spawnES6ToES5() {
    return this.spawnFn('npm', ['run', 'build']);
  }

  spawnBuildDocs() {
    this.spawnFn('npm', ['run', 'docs']);
  }

  spawnBuildDist() {
    this.spawnFn('npm', ['run', 'pack']);
  }

  formatPackJsonCode() {
    const sourcePath = path.join(this.tmpDir, 'package.json');
    const pkgContent = require(sourcePath);
    pkgContent.name = this.name;
    pkgContent.version = this.version;
    pkgContent.homepage = this.homepage;
    pkgContent.keywords = this.keywords.concat(pkgContent.keywords);
    fs.writeFile(
      sourcePath,
      JSON.stringify(pkgContent, null, 2),
      'utf-8',
      (err) => {
        if (err) throw err;
        console.log('package.json 格式化完成');
      }
    );
  }

  formatDocs() {}
}
