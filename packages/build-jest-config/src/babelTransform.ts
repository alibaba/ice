import * as babelJest from 'babel-jest';
import getBabelConfig from '@builder/babel-config';
import formatWinPath from './formatWinPath';

const babelConfig = getBabelConfig();
// options for @babel/preset-env when in test command
const jestBabelConfig = {
  ...babelConfig,
  presets: babelConfig.presets.map((preset) => {
    if (Array.isArray(preset) && formatWinPath(preset[0]).indexOf('@babel/preset-env') > -1) {
      return [preset[0], {
        targets: {
          node: 'current',
        },
      }];
    }
    return preset;
  }),
};
// cjs export while babelTransform will been directly required
module.exports = babelJest.createTransformer(jestBabelConfig);
