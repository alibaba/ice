import { scanImports } from './scanImports';

interface ICheckFunction {
  (packageName: string): boolean;
}
type IRule = ICheckFunction | string | RegExp | string[];
export interface IFilterOptions {
  include?: IRule;
  exclude?: IRule;
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

async function filterPackages(packages: string[], rootDir: string, { include, exclude }: IFilterOptions = {}) {
  const runtimePackages = await scanImports('**/*.@(j|t)s(x)', rootDir);
  return packages.filter((packageName) => {
    if (include && matchRule(packageName, include)) {
      return true;
    }

    if (exclude && matchRule(packageName, exclude)) {
      return false;
    }
    return runtimePackages.includes(packageName);
  });
}

export default filterPackages;