import * as chalk from 'chalk';
import type { IOnHookCallbackArg } from 'build-scripts';
import { getModules } from './entryHelper';
import type { Options } from './types';

const removeRelativePath = (path: string) => {
  return path.replace(/^[./]*/, '');
};

const setDevLog = (args: IOnHookCallbackArg, pluginOptions: Options) => {
  const { err, url } = args;

  if (err) {
    return;
  }

  const { modules, filenameStrategy } = pluginOptions;
  const entries = getModules(modules);

  console.log();
  console.log(chalk.green('[plugin-stark-module] served at: '));

  const formateUrl = (key: string, suffix: 'js' | 'css') => {
    const path = (filenameStrategy ? `${filenameStrategy}.${suffix}` : `./[name]/index.${suffix}`).replace('[name]', key);
    return url + removeRelativePath(path);
  };

  Object.keys(entries)
    .forEach(key => {
      console.log(`${chalk.yellow(key)}: ${chalk.underline.white(formateUrl(key, 'js'))} ${chalk.underline.white(formateUrl(key, 'css'))}`);
    });
};

export default setDevLog;
