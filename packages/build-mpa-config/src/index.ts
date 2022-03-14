import * as path from 'path';
import { formatPath, checkExportDefaultDeclarationExists } from '@builder/app-helpers';
import { IPluginAPI } from 'build-scripts';
import type ReactGenerator from './generate/ReactGenerator';
import type RaxGenerator from './generate/RaxGenerator';
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
  executeGenerateTasks?: boolean;
}

interface MPAEntries extends IEntries {
  generator?: RaxGenerator | ReactGenerator;
  finalEntry: string;
  runAppPath: string | null;
  routesFilePath: string | null;
}

export const generateMPAEntries = (api: IPluginAPI, options: IConfigOptions): Record<string, MPAEntries> => {
  const { context } = api;
  const { framework = 'rax', targetDir = '', executeGenerateTasks = true } = options;
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
    let routesFilePath;
    let generator = null;
    let generateTasks = [];
    if (isAppEntry || checkExportDefaultDeclarationExists(path.join(rootDir, 'src', source))) {
      const result = generateEntry(api, { framework, targetDir, pageEntry: entryPath, entryName, pageConfig, isAppEntry });
      if (executeGenerateTasks) {
        result.generateTasks.forEach((generateTask) => {
          generateTask();
        });
      } else {
        generateTasks = result.generateTasks;
      }
      finalEntry = result.entryPath;
      runAppPath = result.runAppPath;
      routesFilePath = result.routesFilePath;
      generator = result.generator;
    }

    parsedEntries[entryName] = {
      ...entry,
      generator,
      generateTasks,
      finalEntry,
      runAppPath,
      routesFilePath,
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
    const { entryName, finalEntry, runAppPath, routesFilePath } = parsedEntries[entryKey];
    config.entry(entryName).add(finalEntry);
    if (runAppPath) {
      redirectEntries.push({
        entryPath: finalEntry,
        runAppPath,
        routesFilePath,
      });
    }
    // get page paths for rule match
    matchStrs.push(formatPath(routesFilePath));
  });

  api.applyMethod('addImportDeclaration', {
    multipleSource: {
      runApp: redirectEntries.map(({ entryPath, runAppPath }) => ({
        filename: entryPath,
        value: formatPath(runAppPath),
        type: 'normal',
      })),
    },
  });

  if (config.plugins.has('document')) {
    const filteredEntries = { ...parsedEntries };
    // remove property which is unnecessary for plugin document
    delete filteredEntries.generator;
    delete filteredEntries.generateTasks;
    config.plugin('document').tap(args => {
      return [{
        ...args[0],
        pages: Object.values(filteredEntries),
      }];
    });
  }

  // modify appJSON rules for mpa
  const matchInclude = (filepath: string) => {
    const matchReg = matchStrs.length ? new RegExp(matchStrs.join('|')) : null;
    return matchReg && matchReg.test(formatPath(filepath));
  };
  config.module.rule('appJSON').include.add(matchInclude);
};

export default setMPAConfig;
