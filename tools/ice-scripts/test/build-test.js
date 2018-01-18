'use strict';
const del = require('del');
const expect = require('expect');
const glob = require('glob');
const md5 = require('md5');
const minimist = require('minimist');
const mkdirp = require('mkdirp');
const pathExists = require('path-exists');
const join = require('path').join;
const fs = require('fs');
const ICE_SDK_COMPILER = require('../lib/compiler/');
const webpack = ICE_SDK_COMPILER.webpack;
const generateWebpackConfig = ICE_SDK_COMPILER.generateWebpackConfig;

const argv = minimist(process.argv.slice(2));

if (argv.updateExpect) {
  del.sync(join(__dirname, 'expect'), {
    force: true
  });
}

function assert(actualDir, _expect) {
  const expectDir = join(__dirname, 'expect', _expect, 'build');
  actualDir = join(actualDir, 'build');
  const actualFiles = glob.sync('**/*', {
    cwd: actualDir,
    nodir: true
  });

  if (argv.updateExpect) {
    mkdirp.sync(expectDir);
    actualFiles.forEach(file => {
      const actualFile = fs.readFileSync(join(actualDir, file), 'utf-8');
      fs.writeFileSync(join(expectDir, file), actualFile);
    });
  }

  actualFiles.forEach(file => {
    const actualFile = fs.readFileSync(join(actualDir, file), 'utf-8');
    const expectFile = fs.readFileSync(join(expectDir, file), 'utf-8');
    expect(md5(actualFile)).toEqual(md5(expectFile));
  });
}

function compiler(fixture) {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  return new Promise((resolve) => {
    const cwd = join(__dirname, 'fixtures', fixture);
    const config = require(join(cwd, 'config.js'));
    let options = {};
    if (pathExists.sync(join(cwd, 'options.js'))) {
      options = require(join(cwd, 'options.js'));
    }

    process.chdir(cwd);
    const webpackConfig = generateWebpackConfig(config, options);
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        throw new Error(err);
      };
      expect(`hasError ${stats.hasErrors()}`).toBe(`hasError ${false}`);
      assert(cwd, fixture);
      resolve();
    });
  });
}
process.env.NODE_ENV = 'test';
describe('ice-webpack-compiler', function() {
  this.timeout(20000);

  before(function() {
    console.time('测试用例执行总用时');
  });

  after(function() {
    console.log('=================================');
    console.timeEnd('测试用例执行总用时');
    console.log('=================================');
  });

  afterEach(function() {
    process.env.NODE_ENV = 'test';
  });

  it('支持编译 kiss options.autoAlias', () => {
    return compiler('build-kissy');
  });

  it('build-less 支持编译 less', () => {
    return compiler('build-less');
  });

  it('build-less-sourcemap 支持编译 less source-map', () => {
    process.env.NODE_ENV = 'development';
    return compiler('build-less-sourcemap');
  });

  it('build-scss 支持编译 scss', () => {
    return compiler('build-scss');
  });

  it('build-scss-sourcemap 支持编译 scss source-map', () => {
    process.env.NODE_ENV = 'development';
    return compiler('build-scss-sourcemap');
  });

  it('build-scss-common 支持编译 scss commonCSS=true extractCSS=false', () => {
    process.env.NODE_ENV = 'development';
    return compiler('build-scss-common');
  });

  it('build-scss-inline 支持编译 scss commonCSS=false extractCSS=false', () => {
    return compiler('build-scss-inline');
  });

  it('build-css 支持编译 css', () => {
    return compiler('build-css');
  });

  it('build-jsx 支持编译 jsx', () => {
    return compiler('build-jsx');
  });

  it('build-ice 支持编译 ice', () => {
    return compiler('build-ice')
      .then(() => {
        fs.writeFileSync(
          join(__dirname, 'fixtures', 'build-ice', '.gitignore'),
          '#'
        );
      });
  });

  it('build-ice-react 支持编译 ice optiosn.wrapReact=false', () => {
    return compiler('build-ice-react');
  });

  it('build-ice-sourcemap 支持编译 ice source-map', () => {
    process.env.NODE_ENV = 'development';
    return compiler('build-ice-sourcemap');
  });

  it('build-ice-skin 支持编译 ice skin loader, options.themeFile', () => {
    process.env.NODE_ENV = 'development';
    return compiler('build-ice-skin');
  });

  it('build-ice-theme 支持编译 ice skin loader, options.themePackage', () => {
    process.env.NODE_ENV = 'development';
    return compiler('build-ice-theme');
  });

  it('build-ice-polyfill 支持编译 ice skin loader', () => {
    process.env.NODE_ENV = 'development';
    return compiler('build-ice-polyfill')
      .then(() => {
        del.sync(join(__dirname, 'fixtures', 'build-ice-polyfill', '.gitignore'));
      });
  });
});
