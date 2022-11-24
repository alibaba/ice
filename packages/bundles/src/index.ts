import { createRequire } from 'module';
import { dirname } from 'path';
import postcss from 'postcss';
import less from 'less';
import sass from 'sass';
import swc from '@swc/core';

const require = createRequire(import.meta.url);
const SwcPluginRemoveExport = require.resolve('@ice/swc-plugin-remove-export');
const SwcPluginKeepExport = require.resolve('@ice/swc-plugin-keep-export');
const SwcPluginKeepPlatform = require.resolve('@ice/swc-plugin-keep-platform');
const coreJsPath = dirname(require.resolve('core-js/package.json'));

export {
  postcss,
  less,
  sass,

  swc,
  SwcPluginRemoveExport,
  SwcPluginKeepExport,
  SwcPluginKeepPlatform,

  coreJsPath,
};

export type { ProcessOptions } from 'postcss';
export type {
  Options as SwcConfig,
  Config as SwcCompilationConfig,
  ReactConfig,
} from '@swc/core';
