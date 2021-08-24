import { formatPath } from '@builder/app-helpers';
import modifySwcOptions from '../utils/modifySwcOptions';

type BrowserList = string | string[] | Record<string, string>;

const getTargetStr = (browserslist: BrowserList): string => {
  if (typeof browserslist === 'string') {
    return browserslist;
  } else if (Array.isArray(browserslist)) {
    return browserslist.join(',');
  } else if (Object.prototype.toString.call(browserslist) === '[object Object]') {
    return Object.keys(browserslist).map((browserKey) => `${browserKey} >= ${browserslist[browserKey]}`).join(',');
  }
  return '';
};

export default (config, browserslist: BrowserList, { userConfig }) => {
  if (browserslist) {
    // ignore old data log
    process.env.BROWSERSLIST_IGNORE_OLD_DATA = 'true';
    config.target(`browserslist:${getTargetStr(browserslist)}`);
  }
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
