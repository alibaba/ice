import ReactGenerator from './React';
import RaxGenerator from './Rax';
import { IGeneratorOptions } from '../types';

function generateEntry(api, options: IGeneratorOptions): string {
  const { framework } = options;
  let genrator;
  if (framework === 'react') {
    genrator = new ReactGenerator(api, options);
  } else if (framework === 'rax') {
    genrator = new RaxGenerator(api, options);
  }

  genrator.generateEntryFile();

  return genrator.entryPath;
}

export default generateEntry;
