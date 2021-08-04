import * as path from 'path';
import { injectTransformRuntime } from '@builder/app-helpers';
import modifySwcOptions from '../utils/modifySwcOptions';
import * as processPresetEnv from '../utils/processPresetEnv';
import * as addBabelPlugins from '../utils/addBabelPlugins';

const getEntryRegExp = (entryPath) => {
  const entryExtname = path.extname(entryPath);
  return entryExtname ? entryPath : new RegExp(`${entryPath}(.jsx?|.tsx?)$`);
};

export default (config, polyfill, { userConfig }) => {
  const { swc } = userConfig;
  if (swc) {
    modifySwcOptions(config, { env: {
      mode: polyfill || undefined,
      coreJs: 3,
    }});
  } else {
    processPresetEnv(config, {
      useBuiltIns: polyfill,
      corejs: 3,
    });
  }

  if ((polyfill === false || polyfill === 'usage') && !swc) {
    injectTransformRuntime(config);
    return;
  }
  if (polyfill === 'entry') {
    const entries = config.toConfig().entry;
    const rule = config.module.rule('polyfill').test(/\.jsx?|\.tsx?$/);
    const fileList = [];
    if (!entries) return;
    Object.keys(entries).forEach((key) => {
      let addPolyfill = false;
      // only include entry path
      for (let i = 0; i < entries[key].length; i += 1) {
        // filter node_modules file add by plugin
        if (!/node_modules/.test(entries[key][i])) {
          rule.include.add(getEntryRegExp(entries[key][i]));
          fileList.push(entries[key][i]);
          addPolyfill = true;
          break;
        }
      }
      if (!addPolyfill) {
        rule.include.add(getEntryRegExp(entries[key][0]));
        fileList.push(entries[key][0]);
      }
    });
    rule.use('polyfill-loader').loader(require.resolve('../utils/polyfillLoader')).options({});
    if (!swc) {
      addBabelPlugins(config, [[require.resolve('../utils/babelPluginCorejsLock.js'), { fileList }]]);
    }
  }
};
