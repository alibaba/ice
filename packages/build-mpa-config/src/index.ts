import * as path from 'path';
import { formatPath, checkExportDefaultDeclarationExists } from '@builder/app-helpers';
import { IPluginAPI } from 'build-scripts';
import generateEntry from './generate';
import { FrameworkType, IGenerateResult } from './types';

interface IEntries {
  entryName: string;
  entryPath: string;
  source?: string;
  path?: string;
}

interface IConfigOptions {
  type?: string;
  framework?: FrameworkType;
  entries?: IEntries[];
  targetDir?: string;
}

export const generateMPAEntries = (api: IPluginAPI, options: IConfigOptions) => {
  const { context } = api;
  const { framework = 'rax', targetDir = '' } = options;
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
    const { entryName, entryPath, ...pageConfig } = entry;
    const { source } = pageConfig;
    const isAppEntry = /app(\.(t|j)sx?)?$/.test(entryPath);
    // when the entry has no export default declaration, do not generate any files
    let finalEntry = entryPath;
    let runAppPath = null;
    if (isAppEntry || checkExportDefaultDeclarationExists(path.join(rootDir, 'src', source))) {
      const result = generateEntry(api, { framework, targetDir, pageEntry: entryPath, entryName, pageConfig, isAppEntry });
      finalEntry = result.entryPath;
      runAppPath = result.runAppPath;
    }

    parsedEntries[entryName] = {
      ...entry,
      finalEntry,
      shouldRedirectRunApp: isAppEntry,
      runAppPath,
    };
  });
  return parsedEntries;
};

const setMPAConfig = (api, config, options: IConfigOptions) => {
  if (!options) {
    throw new Error('There need pass options param to setMPAConfig method');
  }
  const parsedEntries = generateMPAEntries(api, options);

  // clear entry points
  config.entryPoints.clear();
  // add mpa entries
  const matchStrs = [];
  // add redirect entry path
  const redirectEntries: IGenerateResult[] = [];
  Object.keys(parsedEntries).forEach((entryKey) => {
    const { entryName, source, finalEntry, shouldRedirectRunApp, runAppPath } = parsedEntries[entryKey];
    config.entry(entryName).add(finalEntry);
    if (shouldRedirectRunApp) {
      redirectEntries.push({
        entryPath: finalEntry,
        runAppPath,
      });
    }
    // get page paths for rule match
    const matchStr = `src/${source}`;
    matchStrs.push(formatPath(matchStr));
  });

  api.applyMethod('addImportDeclaration', {
    multipleSource: {
      runApp: redirectEntries.map(({ entryPath, runAppPath }) => ({
        filename: entryPath,
        value: runAppPath,
        type: 'normal',
      })),
    },
  });

  if (config.plugins.has('document')) {
    config.plugin('document').tap(args => {
      return [{
        ...args[0],
        pages: Object.values(parsedEntries),
      }];
    });
  }

  // modify appJSON rules for mpa
  const matchInclude = (filepath: string) => {
    const matchReg = matchStrs.length ? new RegExp(matchStrs.join('|')) : null;
    return matchReg && matchReg.test(filepath);
  };
  config.module.rule('appJSON').include.add(matchInclude);
};

export default setMPAConfig;
