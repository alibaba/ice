import ReactGenerator from './React';
import RaxGenerator from './Rax';
import { IGeneratorOptions, IGenerateResult } from '../types';

function generatePageFiles(api, options: IGeneratorOptions): IGenerateResult {
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
    };
  }

  generator.generateEntryFile();
  return {
    entryPath: generator.entryPath,
    runAppPath: generator.runAppPath,
  };
}

export default generatePageFiles;
