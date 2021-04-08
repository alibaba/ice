import * as path from 'path';
import * as glob from 'fast-glob';
import { scanImports } from './scanImports';
import builtInDependencies from './builtInDependenies';

interface ICheckFunction {
  (packageName: string): boolean;
}
export type IRule = ICheckFunction | string | RegExp | string[];
export interface IFilterOptions {
  include?: IRule;
  exclude?: IRule;
  autoDetect?: boolean;
  remoteCoreJs?: boolean;
}

function matchRule(str: string, rule: IRule) {
  if (typeof rule === 'function') {
    return rule(str);
  } else if (typeof rule === 'string' || Array.isArray(rule)) {
    return (Array.isArray(rule) ? rule : [rule]).includes(str);
  } else if (rule instanceof RegExp) {
    return rule.test(str);
  }
  return false;
}

async function filterPackages(packages: string[], rootDir: string, { include, exclude, autoDetect = true, remoteCoreJs = true }: IFilterOptions = {}) {
  let runtimePackages = [];
  if (autoDetect) {
    runtimePackages = await scanImports('**/*.@(j|t)s(x)', rootDir);
  }
  // get core-js runtime
  const coreJsFolder = require.resolve('core-js');
  const coreJsModules = remoteCoreJs ? (await glob('*.js', {
    cwd: path.join(path.dirname(coreJsFolder), 'modules'),
  })).map((module) => `core-js/modules/${module}`) : [];
  // unique
  const filteredPackages = packages.filter((packageName) => {
    if (include && matchRule(packageName, include)) {
      return true;
    }

    // built-in rule for exclude packages
    const startsWithPrefixs = ['@babel/', '@types/'];
    const includesStrings = ['webpack-plugin', 'eslint-config', 'build-plugin-', 'tslint-config', 'babel-plugin', 'babel-preset'];
    const excludePackages = ['ice', 'ice.js', 'ice-scripts', 'webpack', 'eslint', '@iceworks/spec', 'stylelint'];
    if (startsWithPrefixs.some(prefix => packageName.startsWith(prefix))
      || includesStrings.some(str => packageName.includes(str))
      || excludePackages.some(str => packageName === str)) {
      return false;
    }

    if (exclude && matchRule(packageName, exclude)) {
      return false;
    }
    return autoDetect ? runtimePackages.includes(packageName) : true;
  });
  return Array.from(new Set([...builtInDependencies, ...coreJsModules].concat(filteredPackages)));
}

export default filterPackages;