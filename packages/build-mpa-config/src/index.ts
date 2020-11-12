import * as path from 'path';
import { formatPath } from 'build-app-helpers';

interface IEntries {
  entryName: string;
  pageName: string;
  entryPath: string;
}

interface IConfigOptions {
  context: {
    rootDir: string;
    commandArgs: any;
  };
  type: string;
  framework: string;

  entries?: IEntries[];
}

const setMPAConfig = (config, options: IConfigOptions) => {
  if (!options) {
    throw new Error('There need pass options param to setMPAConfig method');
  }
  const { context, type = 'web', framework = 'rax' } = options;
  let { entries } = options;
  const { rootDir, commandArgs } = context;
  if (commandArgs.mpaEntry) {
    const arr = commandArgs.mpaEntry.split(',');
    entries = entries.filter((entry) => {
      return arr.includes(entry.entryName);
    });
  }
  // do not splitChunks when mpa
  config.optimization.splitChunks({ cacheGroups: {} });
  // clear entry points
  config.entryPoints.clear();
  // add mpa entries
  const matchStrs = [];
  const includeEntryList = [];
  entries.forEach((entry) => {
    const { entryName, entryPath, pageName } = entry;
    const pageEntry = path.join(rootDir, 'src/pages', entryPath);
    const useOriginEntry = /app\.(t|j)sx?$/.test(entryPath) || type === 'node';
    config.entry(entryName).add(pageEntry);
    if (!useOriginEntry) {
      includeEntryList.push(formatPath(pageEntry));
    }
    // get page paths for rule match
    const matchStr = `src/pages/${pageName}`;
    matchStrs.push(formatPath(matchStr));
  });

  if (includeEntryList.length) {
    // add mpa-loader for MPA entries
    ['tsx', 'jsx'].forEach((rule) => {
      if (config.module.rules.has(rule)) {
        config.module.rule(rule)
          .use('mpa-loader')
          .loader(require.resolve('./mpa-loader'))
          .options({ framework, type, includeEntryList });
      }
    });
  }

  if (type === 'web') {
    config.plugin('document').tap(args => {
      return [{
        ...args[0],
        pages: entries,
      }];
    });
  }

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
