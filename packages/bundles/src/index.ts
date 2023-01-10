import { createRequire } from 'module';
import { dirname } from 'path';
import postcss from 'postcss';
import less from 'less';
import sass from 'sass';
import swc from '@swc/core';
import esbuild from 'esbuild';

const require = createRequire(import.meta.url);
const swcPluginRemoveExport = require.resolve('@ice/swc-plugin-remove-export');
const swcPluginKeepExport = require.resolve('@ice/swc-plugin-keep-export');
const coreJsPath = dirname(require.resolve('core-js/package.json'));
export {
  postcss,
  less,
  sass,

  swc,
  swcPluginRemoveExport,
  swcPluginKeepExport,

  coreJsPath,

  esbuild,
};

export type { ProcessOptions } from 'postcss';
export type {
  Options as SwcConfig,
  Config as SwcCompilationConfig,
  ReactConfig,
} from '@swc/core';
