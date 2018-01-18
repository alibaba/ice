const ICE_SDK_COMPILER = require('../lib/compiler/');
const generateWebpackConfig = ICE_SDK_COMPILER.generateWebpackConfig;
import fs from 'fs';
import path from 'path';

const webpackConfig = generateWebpackConfig({
  entry: {
    index: './index.js'
  }
});

fs.writeFileSync(path.join(__dirname, './webpack.config.json'),
  JSON.stringify(webpackConfig, null, 2));
