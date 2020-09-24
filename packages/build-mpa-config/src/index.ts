import * as path from 'path';
import getEntries from './getEntries';

interface ConfigOptions {
  rootDir: string;
  filterEntries: Function;
  type: string;
}

const setMPAConfig = (config, options: ConfigOptions) => {
  const { rootDir, type = 'rax', filterEntries = () => {} } = options || {};
  let mpaEntries = getEntries(rootDir);
  mpaEntries = filterEntries(mpaEntries);
  // clear entry points
  config.entryPoints.clear();
  // add mpa entries
  const matchStrs = [];
  mpaEntries.forEach((entry) => {
    const { entryName, entryPath, pageName } = entry;
    const pageEntry = path.join(rootDir, 'src/pages', entryPath);
    config.entry(entryName).add(/app\.(t|j)sx?$/.test(entryPath) ? pageEntry : `${require.resolve('./mpa-loader')}?type=${type}!${pageEntry}`);
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