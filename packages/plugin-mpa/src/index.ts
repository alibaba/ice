import * as path from 'path';
import { IPlugin } from '@alib/build-scripts';
import getEntries from './getEntries';

const plugin: IPlugin = ({ context, onGetWebpackConfig }) => {
  const { rootDir } = context;
  const mpaEntries = getEntries(rootDir);
  onGetWebpackConfig('web', (config) => {
    // clear entry points
    config.entryPoints.clear();
    // add mpa entries
    const matchStrs = [];
    mpaEntries.forEach((entry) => {
      const { entryName, entryPath, pageName } = entry;
      const pageEntry = path.join(rootDir, 'src/pages', entryPath);
      config.entry(entryName).add(/app\.(t|j)sx?$/.test(entryPath) ? pageEntry : `${require.resolve('./mpa-loader')}?type=rax!${pageEntry}`);
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
  });
  // TODO mpa index html
};

export default plugin;