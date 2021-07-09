import generateEntry from './entry';
import generateRunApp from './runApp';
import ReactGenerator from './React';
import RaxGenerator from './Rax';
import { IGeneratorOptions } from '../types';

function init(api, options: IGeneratorOptions) {
  const { framework } = options;
  let genrator;
  if (framework === 'react') {
    genrator = new ReactGenerator(api, options);
  } else if (framework === 'rax') {
    genrator = new RaxGenerator(api, options);
  }

  return genrator;
}
