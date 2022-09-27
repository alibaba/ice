import * as path from 'path';

export const RUNTIME_TMP_DIR = '.ice';
export const ROUTER_MANIFEST = path.join(RUNTIME_TMP_DIR, 'route-manifest.json');
export const SERVER_ENTRY = path.join(RUNTIME_TMP_DIR, 'entry.server.ts');
export const DATA_LOADER_ENTRY = path.join(RUNTIME_TMP_DIR, 'data-loader.ts');
export const SERVER_OUTPUT_DIR = 'server';
export const CACHE_DIR = path.join('node_modules', '.cache');
export const BUILDIN_ESM_DEPS = [
  '@ice/runtime',
];
export const BUILDIN_CJS_DEPS = [
  'react',
  'react-dom',
  '@uni/env',
  'universal-env',
];

export const WEB = 'web';
export const ALI_MINIAPP = 'ali-miniapp';
export const WECHAT_MINIPROGRAM = 'wechat-miniprogram';
export const BYTEDANCE_MICROAPP = 'bytedance-microapp';
export const BAIDU_SMARTPROGRAM = 'baidu-smartprogram';
export const KUAISHOU_MINIPROGRAM = 'kuaishou-miniprogram';

export const MINIAPP_PLATFORMS = [
  ALI_MINIAPP, WECHAT_MINIPROGRAM, BYTEDANCE_MICROAPP,
  BAIDU_SMARTPROGRAM, KUAISHOU_MINIPROGRAM,
];
export const ALL_PLATFORMS = [
  WEB,
  ...MINIAPP_PLATFORMS,
];

export const REG_TEMPLATE = /\.(wxml|axml|ttml|swan|ksml)(\?.*)?$/;
export const REG_STYLE = /\.(css|scss|sass|less|styl|stylus|wxss|acss|ttss)(\?.*)?$/;

export const NODE_MODULES_REG = /(.*)node_modules/;

export enum META_TYPE {
  ENTRY = 'ENTRY',
  PAGE = 'PAGE',
  COMPONENT = 'COMPONENT',
  NORMAL = 'NORMAL',
  STATIC = 'STATIC',
  CONFIG = 'CONFIG',
  EXPORTS = 'EXPORTS',
}

export const JS_EXT: string[] = ['.js', '.jsx'];
export const TS_EXT: string[] = ['.ts', '.tsx'];
export const SCRIPT_EXT: string[] = JS_EXT.concat(TS_EXT);

