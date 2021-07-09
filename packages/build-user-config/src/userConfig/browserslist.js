import { formatPath } from '@builder/app-helpers';
import modifySwcOptions from '../utils/modifySwcOptions';

export default (config, browserslist, { userConfig }) => {
  if (userConfig.swc) {
    modifySwcOptions(config, { env: { targets: browserslist } });
  } else {
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          const babelPresets = options.presets || [];
          const presets = babelPresets.map((preset) => {
            if (Array.isArray(preset) && formatPath(preset[0]).indexOf(formatPath('@babel/preset-env')) > -1) {
              return [
                preset[0],
                Object.assign(preset[1], { targets: browserslist }),
              ];
            }
            return preset;
          });
          return Object.assign(options, { presets });
        });
    });
  }
};
