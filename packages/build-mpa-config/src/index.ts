import * as path from 'path';
import { formatPath } from '@builder/app-helpers';
import generateEntry from './generateEntry';
import checkExportDefaultDeclarationExists from './checkExportDefaultDeclarationExists';

interface IEntries {
  entryName: string;
  entryPath: string;
  source: string;
  path: string;
}

interface IConfigOptions {
  type?: string;
  framework?: string;
  entries?: IEntries[];
  targetDir?: string;
}
export const generateMPAEntries = (api, options: IConfigOptions) => {
  const { context } = api;
  const { type = 'web', framework = 'rax', targetDir = '' } = options;
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
    const { entryName, entryPath, source } = entry;
    const pageEntry = path.isAbsolute(entryPath) ? entryPath : path.join(rootDir, 'src', entryPath);
    const useOriginEntry = /app\.(t|j)sx?$/.test(entryPath) || type === 'node';
    const exportDefaultDeclarationExists = checkExportDefaultDeclarationExists(path.join(rootDir, 'src', source));
    // icejs will config entry by api modifyUserConfig

    let finalEntry = pageEntry;
    if (exportDefaultDeclarationExists && !useOriginEntry) {
      // generate mpa entries
      finalEntry = generateEntry(api, { framework, targetDir, pageEntry, entryName });
    }
    parsedEntries[entryName] = {
      ...entry,
      finalEntry,
    };
  });
  return parsedEntries;
};

const setMPAConfig = (api, config, options: IConfigOptions) => {
  if (!options) {
    throw new Error('There need pass options param to setMPAConfig method');
  }
  const { type = 'web' } = options;
  const parsedEntries = generateMPAEntries(api, options);

  // do not splitChunks when mpa
  config.optimization.splitChunks({ cacheGroups: {} });
  // clear entry points
  config.entryPoints.clear();
  // add mpa entries
  const matchStrs = [];

  Object.keys(parsedEntries).forEach((entryKey) => {
    const { entryName, entryPath, source, finalEntry } = parsedEntries[entryKey];
    config.entry(entryName).add(finalEntry);

    // get page paths for rule match
    const matchStr = source ? `src/${source}` : `src/${entryPath}`;
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
