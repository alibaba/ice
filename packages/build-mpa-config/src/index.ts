import * as path from 'path';
import getEntries from './getEntries';

interface ConfigOptions {
  context: {
    rootDir: string;
    commandArgs: any;
  };
  type: string;
  framework: string;
}

const setMPAConfig = (config, options: ConfigOptions) => {
  const { context, type = 'web', framework = 'rax' } = options || {};
  const { rootDir, commandArgs } = context;
  let mpaEntries = getEntries(rootDir);
  if (commandArgs.mpaEntry) {
    const arr = commandArgs.mpaEntry.split(',');
    mpaEntries = mpaEntries.filter((entry) => {
      return arr.includes(entry.entryName);
    });
  }
  // do not splitChunks when mpa
  config.optimization.splitChunks({ cacheGroups: {} });
  // clear entry points
  config.entryPoints.clear();
  // add mpa entries
  const matchStrs = [];
  mpaEntries.forEach((entry) => {
    const { entryName, entryPath, pageName } = entry;
    const pageEntry = path.join(rootDir, 'src/pages', entryPath);
    config.entry(entryName).add(/app\.(t|j)sx?$/.test(entryPath) ? pageEntry : `${require.resolve('./mpa-loader')}?type=${type}&framework=${framework}!${pageEntry}`);
    // get page paths for rule match
    const matchStr = `src/pages/${pageName}`;
    matchStrs.push(process.platform === 'win32' ? matchStr.replace(/\//g, '\\\\') : matchStr);
  });
  // modify appJSON rules for mpa
  if (config.module.rules.get('appJSON')) {
    const matchInclude = (filepath: string) => {
      const matchReg = matchStrs.length ? new RegExp(matchStrs.join('|')) : null;
      return matchReg && matchReg.test(filepath);
    };
    config.module.rule('appJSON').include.add(matchInclude);
  }
};

export default setMPAConfig;
