import * as path from 'path';
import { formatPath } from '@builder/app-helpers';
import generateEntry from './generateEntry';

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
  type?: string;
  framework: string;
  entries?: IEntries[];
  targetDir: string;
}
export const generateMPAEntries = (options: IConfigOptions) => {
  const { context, type = 'web', framework = 'rax', targetDir = '' } = options;
  let { entries } = options;
  const { rootDir, commandArgs } = context;
  if (commandArgs.mpaEntry) {
    const arr = commandArgs.mpaEntry.split(',');
    entries = entries.filter((entry) => {
      return arr.includes(entry.entryName);
    });
  }

  const parsedEntries = {};
  entries.forEach((entry) => {
    const { entryName, entryPath } = entry;
    const pageEntry = path.join(rootDir, 'src/pages', entryPath);
    const useOriginEntry = /app\.(t|j)sx?$/.test(entryPath) || type === 'node';
    // icejs will config entry by api modifyUserConfig

    let finalEntry = pageEntry;
    if (!useOriginEntry) {
      // generate mpa entries
      finalEntry = generateEntry({ framework, targetDir, type, pageEntry, entryName });
    }
    parsedEntries[entryName] = {
      ...entry,
      finalEntry,
    };
  });
  return parsedEntries;
};

const setMPAConfig = (config, options: IConfigOptions) => {
  if (!options) {
    throw new Error('There need pass options param to setMPAConfig method');
  }
  const { type = 'web' } = options;
  const parsedEntries = generateMPAEntries(options);

  // do not splitChunks when mpa
  config.optimization.splitChunks({ cacheGroups: {} });
  // clear entry points
  config.entryPoints.clear();
  // add mpa entries
  const matchStrs = [];

  Object.keys(parsedEntries).forEach((entryKey) => {
    const { entryName, pageName, finalEntry } = parsedEntries[entryKey];
    config.entry(entryName).add(finalEntry);

    // get page paths for rule match
    const matchStr = `src/pages/${pageName}`;
    matchStrs.push(formatPath(matchStr));
  });

  if (type === 'web' && config.plugins.has('document')) {
    config.plugin('document').tap(args => {
      return [{
        ...args[0],
        pages: Object.values(parsedEntries),
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
