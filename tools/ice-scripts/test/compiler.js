'use strict';
const minimist = require('minimist');
const pathExists = require('path-exists');
const path = require('path');
const fs = require('fs');
const ICE_SDK_COMPILER = require('../lib/compiler/');
const webpack = ICE_SDK_COMPILER.webpack;
const generateWebpackConfig = ICE_SDK_COMPILER.generateWebpackConfig;

const argv = minimist(process.argv.slice(2));

function compiler(fixture) {
  console.log('构建:', fixture);
  return new Promise((resolve) => {
    const cwd = path.join(__dirname, 'fixtures', fixture);
    const config = require(path.join(cwd, 'config.js'));
    let options = {};
    if (pathExists.sync(path.join(cwd, 'options.js'))) {
      options = require(path.join(cwd, 'options.js'));
    }

    process.chdir(cwd);

    console.log(process.cwd());
    const webpackConfig = generateWebpackConfig(config, options);

    webpack(webpackConfig, (err, stats) => {
      if (err) {
        throw new Error(err);
      }
      console.log(stats.toString({
        colors: true,
        assets: true,
        chunks: false,
        children: false
      }));
      resolve(stats);
    });
  });
};

const fixtures = fs.readdirSync(path.join(__dirname, 'fixtures')).filter(directory => {
  return directory.indexOf('.') !== 0;
});
const buildFixtures = argv._.length > 0 ? argv._ : fixtures;

let step = 0;

console.time('run all webpack');
(function run(step) {
  console.log('=========== %s/%s ===========', step + 1, buildFixtures.length);
  compiler(buildFixtures[step])
    .then(() => {
      if (step < buildFixtures.length - 1) {
        step++;
        run(step);
      } else {
        console.log('=========== done ===========');
        console.timeEnd('run all webpack');
      }
    });
})(step);
