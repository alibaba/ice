import compilationPlugin, { isSupportedFeature } from './unPlugins/compilation.js';
import compileExcludes from './compileExcludes.js';
import getCompilerPlugins from './getCompilerPlugins.js';
import getDefineVars from './getDefineVars.js';
import getPostcssOpts from './getPostcssOpts.js';
import getCSSModuleLocalIdent from './getCSSModuleLocalIdent.js';

export {
  getCSSModuleLocalIdent,
  compilationPlugin,
  isSupportedFeature,
  compileExcludes,
  getCompilerPlugins,
  getDefineVars,
  getPostcssOpts,
};
