import scanImports from './scanImports';
import builtInDeps from './builtInDeps';

type ICheckFunction = {
  (packageName: string): boolean;
}
export type IRule = ICheckFunction | string | RegExp | string[];
export interface IFilterOptions {
  include?: IRule;
  exclude?: IRule;
  autoDetect?: boolean;
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

export default async function getCompileDeps(packages: string[], rootDir: string, { include, exclude, autoDetect= true }: IFilterOptions) {
  let runtimePackages = [];
  if (autoDetect) {
    runtimePackages = await scanImports('**/*.@(j|t)s(x)', rootDir);
  }

  const filteredPackages = runtimePackages.concat(packages).filter((packageName) => {
    if (include && matchRule(packageName, include)) {
      return true;
    }

    // built-in rule for exclude packages
    const startsWithPrefix = ['@babel/', '@types/'];
    const includesStrings = ['webpack-plugin', 'eslint-config', 'build-plugin-', 'tslint-config', 'babel-plugin', 'babel-preset'];
    const excludePackages = ['ice', 'ice.js', 'ice-scripts', 'webpack', 'eslint', '@iceworks/spec', 'stylelint'];
    if (startsWithPrefix.some(prefix => packageName.startsWith(prefix))
      || includesStrings.some(str => packageName.includes(str))
      || excludePackages.includes(packageName)) {
      return false;
    }

    if (exclude && matchRule(packageName, exclude)) {
      return false;
    }
    return true;
  });
  // unique
  return Array.from(new Set(filteredPackages.concat(builtInDeps)));
}