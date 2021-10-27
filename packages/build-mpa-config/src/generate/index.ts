import { IPluginAPI } from 'build-scripts';
import ReactGenerator from './ReactGenerator';
import RaxGenerator from './RaxGenerator';
import { IGeneratorOptions, IGenerateResult } from '../types';

function generatePageFiles(api: IPluginAPI, options: IGeneratorOptions): IGenerateResult {
  const { framework, pageEntry, isAppEntry } = options;
  let generator;
  if (framework === 'react') {
    generator = new ReactGenerator(api, options);
  } else if (framework === 'rax') {
    generator = new RaxGenerator(api, options);
  }

  const { context: { userConfig } } = api;
  generator.generateRunAppFile(userConfig);

  // Do not modify the page entry when entryPath ends with app.ts
  if (isAppEntry) {
    return {
      entryPath: pageEntry,
      runAppPath: generator.runAppPath,
      routesFilePath: generator.routesFilePath,
    };
  }

  generator.generateEntryFile();
  return {
    entryPath: generator.entryPath,
    runAppPath: generator.runAppPath,
    routesFilePath: generator.routesFilePath,
  };
}

export default generatePageFiles;
