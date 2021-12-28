import { IPluginAPI } from 'build-scripts';
import ReactGenerator from './ReactGenerator';
import RaxGenerator from './RaxGenerator';
import { IGeneratorOptions, IGenerateResult } from '../types';

function generatePageFiles(api: IPluginAPI, options: IGeneratorOptions): IGenerateResult {
  const { onHook, context } = api;
  const { command } = context;
  const { framework, pageEntry, isAppEntry } = options;
  let generator;
  if (framework === 'react') {
    generator = new ReactGenerator(api, options);
  } else if (framework === 'rax') {
    generator = new RaxGenerator(api, options);
  }

  const { context: { userConfig } } = api;
  onHook(`before.${command}.run`, () => {
    generator.generateRunAppFile(userConfig);
  });

  // Do not modify the page entry when entryPath ends with app.ts
  if (isAppEntry) {
    return {
      generator,
      entryPath: pageEntry,
      runAppPath: generator.runAppPath,
      routesFilePath: generator.routesFilePath,
    };
  }
  onHook(`before.${command}.run`, () => {
    generator.generateEntryFile();
  });
  return {
    generator,
    entryPath: generator.entryPath,
    runAppPath: generator.runAppPath,
    routesFilePath: generator.routesFilePath,
  };
}

export default generatePageFiles;
