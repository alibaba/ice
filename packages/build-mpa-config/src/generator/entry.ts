import * as path from 'path';
import ReactGenerator from './React';
import RaxGenerator from './Rax';
import { IGeneratorOptions } from '../types';

function generateEntry(api, options: IGeneratorOptions): string {
  const { framework, pageEntry, targetDir } = options;
  let genrator;
  if (framework === 'react') {
    genrator = new ReactGenerator(api, options);
  } else if (framework === 'rax') {
    genrator = new RaxGenerator(api, options);
  }

  const routesFilePath = genrator.getRoutesFilePath(pageEntry);

  if (routesFilePath) {
    genrator.runAppPath = path.join(targetDir, 'core/runApp.ts');
  } else {
    const { context: { userConfig } } = api;
    genrator.runAppPath = path.join(this.entryFolder, 'runApp.ts');
    genrator.generateRunAppFile(userConfig);
  }

  genrator.generateEntryFile();

  return genrator.entryPath;
}

export default generateEntry;
