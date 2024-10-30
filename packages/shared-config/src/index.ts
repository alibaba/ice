import compilationPlugin, { isSupportedFeature, getJsxTransformOptions, getSupportedBrowsers } from './unPlugins/compilation.js';
import compileExcludes, { SKIP_COMPILE as skipCompilePackages } from './compileExcludes.js';
import getCompilerPlugins from './getCompilerPlugins.js';
import getDefineVars from './getDefineVars.js';
import getPostcssOpts from './getPostcssOpts.js';
import getCSSModuleLocalIdent from './getCSSModuleLocalIdent.js';
import getAliasWithRoot from './getAlias.js';
import getDevtoolValue from './utils/getDevtool.js';

export {
  getCSSModuleLocalIdent,
  compilationPlugin,
  isSupportedFeature,
  compileExcludes,
  skipCompilePackages,
  getJsxTransformOptions,
  getCompilerPlugins,
  getDefineVars,
  getPostcssOpts,
  getAliasWithRoot,
  getDevtoolValue,
  getSupportedBrowsers,
};
