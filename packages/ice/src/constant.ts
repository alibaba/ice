import * as path from 'path';

export const DEFAULT_PORT = 3000;
export const DEFAULT_HOST = '0.0.0.0';

export const RUNTIME_TMP_DIR = '.ice';
export const SERVER_ENTRY = path.join(RUNTIME_TMP_DIR, 'entry.server.ts');
export const DATA_LOADER_ENTRY = path.join(RUNTIME_TMP_DIR, 'data-loader.ts');
export const SERVER_OUTPUT_DIR = 'server';
export const IMPORT_META_TARGET = 'import.meta.target';
export const IMPORT_META_RENDERER = 'import.meta.renderer';
export const CACHE_DIR = path.join('node_modules', '.cache');
export const BUILDIN_ESM_DEPS = [
  '@ice/runtime',
];
export const BUILDIN_CJS_DEPS = [
  'react',
  'react-dom',
];

export const WEB = 'web';
export const WEEX = 'weex';
export const ALI_MINIAPP = 'ali-miniapp';
export const WECHAT_MINIPROGRAM = 'wechat-miniprogram';
export const BYTEDANCE_MICROAPP = 'bytedance-microapp';
export const BAIDU_SMARTPROGRAM = 'baidu-smartprogram';
export const KUAISHOU_MINIPROGRAM = 'kuaishou-miniprogram';

export const MINIAPP_TARGETS = [
  ALI_MINIAPP, WECHAT_MINIPROGRAM, BYTEDANCE_MICROAPP,
  BAIDU_SMARTPROGRAM, KUAISHOU_MINIPROGRAM,
];

export const TARGETS = [
  WEB,
  WEEX,
  ...MINIAPP_TARGETS,
];

export const RUNTIME_EXPORTS = [
  {
    specifier: [
      'Link',
      'Outlet',
      'useParams',
      'useSearchParams',
      'useLocation',
      'useData',
      'useConfig',
      'useNavigate',
    ],
    source: '@ice/runtime/router',
  },
  {
    specifier: [
      'defineAppConfig',
      'useAppData',
      'history',
      'KeepAliveOutlet',
      'useMounted',
      'ClientOnly',
      'withSuspense',
      'useSuspenseData',
      'defineDataLoader',
      'defineServerDataLoader',
      'defineStaticDataLoader',
      'usePageLifecycle',
    ],
    source: '@ice/runtime',
  },
];
