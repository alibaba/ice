const path = require('path');
const fs = require('fs');
const spawn = require('cross-spawn');
const webpack = require('webpack');
const chalk = require('chalk');
const webpackConfig = require('./webpack.config');

module.exports = function buildBlock(blocks) {
  console.log(
    chalk.green(' ===========【 开始构建线上资源不存在的区块 】========== ')
  );

  const tasks = blocks.reduce((promise, blockName) => {
    const blocksDir = path.join(process.cwd(), 'react-materials/blocks');
    const cwd = path.join(blocksDir, blockName);
    const pkg = require(path.join(cwd, 'package.json'));

    const p = promise.then((allBlocks) => {
      return new Promise((resolve, reject) => {
        const distDir = path.resolve(process.cwd(), 'block-dist', blockName);

        // 安装依赖
        const npmInstall = spawn('npm', ['install'], { cwd });

        npmInstall.stdout.on('data', (data) => {
          console.log(`${blockName}安装依赖中`);
        });

        npmInstall.stderr.on('data', (data) => {
          console.log(`${blockName}安装依赖失败：${data}`);
        });

        npmInstall.on('close', (code) => {
          console.log(`${blockName}安装依赖完成`);
          const filename = `${pkg.version}.js`;
          webpack(webpackConfig(cwd, filename, distDir), (err, stats) => {
            if (err || stats.hasErrors()) {
              reject(err);
              console.log(stats.toString(statsConfig()));
              console.log(
                chalk.red(` ===========【 构建失败：${blockName} 】========== `)
              );
              process.exit(1);
            }

            allBlocks.push({
              name: blockName,
              version: pkg.version,
              distDir,
            });
            console.log(stats.toString(statsConfig()));
            console.log(
              chalk.green(` ===========【 构建成功：${blockName} 】========== `)
            );
            resolve(allBlocks);
          });
        });
      });
    });

    return p;
  }, Promise.resolve([]));

  return tasks;
};

/**
 * webpack stats config
 */
function statsConfig() {
  return {
    colors: true,
    chunks: false,
    assets: true,
    children: false,
    modules: false,
  };
}
