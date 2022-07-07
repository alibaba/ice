import type { BuildOptions } from 'esbuild';
import { BUILDIN_CJS_DEPS, BUILDIN_ESM_DEPS } from '../constant.js';

export default function isExternalBuiltinDep(dep: string, format: BuildOptions['format'] = 'esm') {
  const buildinDeps = [...BUILDIN_CJS_DEPS];
  if (format === 'esm') {
    buildinDeps.push(...BUILDIN_ESM_DEPS);
  }
  return buildinDeps.some((buildinDep) => {
    return dep === buildinDep || dep.startsWith(`${buildinDep}/`);
  });
}
