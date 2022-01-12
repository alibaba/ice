import type { Plugin, UserConfig } from 'vite';
import createSSRDevHandler from './ssrDevHandler';

const externalPackages = [
  // server 入口依赖
  'cheerio',
  '@loadable/server',
  'chalk',
  'parseurl',
  // @ice/runtime 依赖
  'axios',
  'path-to-regexp',
  // @ice/store 依赖
  'react-redux',
  'lodash.isfunction',
];

const vitePluginSSRServer = (ssrEntry: string): Plugin => {
  return {
    name: 'vite-plugin-ssr',
    enforce: 'pre',
    config() {
      return {
        ssr: {
          // 主要由 server 入口和 noExternal 引入的 cjs 依赖，基于 cjs 规范，可以直接通过 ssrImport，如果不设置将通过 esm 方式执行导致 require / module 是 undefined 报错
          external: externalPackages,
          // 设置 noExternal 逻辑，以下包均只存在 esm 产物，但未设置 type: "module"，设置 noExternal 将不会通过 ssrImport 直接执行
          // TODO：后续需要以下包以相应规范产出 cjs 模块
          noExternal: ['create-app-shared', 'react-app-renderer', '@ice/runtime', '@ice/store', 'miniapp-history'],
        },
      } as UserConfig;
    },
    configResolved(resolvedConfig) {
      resolvedConfig.resolve.alias.push({
        // universal-env 写法非标准
        // TODO：universal-env 打包出标准的 ESM 产物
        find: /universal-env$/,
        replacement: '@uni/env',
      });
    },
    configureServer: async (server) => {
      const handler = createSSRDevHandler(server, { ssrEntry});
      return () => server.middlewares.use(handler);
    },
  };
};

export default vitePluginSSRServer;
