import { createRequire } from 'module';
import { dirname } from 'path';
import postcss from 'postcss';
import less from 'less';
import sass from 'sass';
import swc from '@swc/core';
import esbuild from 'esbuild';
import * as caniuseLite from 'caniuse-lite';
import { getCssModulesLocalIdent } from '@ice/css-modules-hash';
import asyncLib from 'neo-async';
import * as acorn from 'acorn-loose';

const require = createRequire(import.meta.url);
const swcPluginRemoveExport = require.resolve('@ice/swc-plugin-remove-export');
const swcPluginKeepExport = require.resolve('@ice/swc-plugin-keep-export');
const swcPluginNodeTransform = require.resolve('@ice/swc-plugin-node-transform');
const swcPluginReactServerComponent = require.resolve('@ice/swc-plugin-react-server-component');
const coreJsPath = dirname(require.resolve('core-js/package.json'));
export {
  postcss,
  less,
  sass,

  swc,
  swcPluginRemoveExport,
  swcPluginKeepExport,
  swcPluginNodeTransform,
  swcPluginReactServerComponent,

  coreJsPath,

  esbuild,
  caniuseLite,
  getCssModulesLocalIdent,
  asyncLib,
  acorn,
};

export type { ProcessOptions } from 'postcss';
export type {
  Options as SwcConfig,
  Config as SwcCompilationConfig,
  ReactConfig,
} from '@swc/core';
