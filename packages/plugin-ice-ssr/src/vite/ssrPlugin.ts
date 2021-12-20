import type { Plugin, UserConfig } from 'vite';
import createSSRDevHandler from './ssrDevHandler';

const invalidPackages = [
  // node dependencies with exports
  'cheerio',
  '@loadable/server',
  'chalk',
  'parseurl',
];

const vitePluginSSR = (ssrEntry: string): Plugin => {
  return {
    name: 'vite-plugin-ssr',
    enforce: 'pre',
    config() {
      return {
        ssr: {
          // 添加 no external 配置，通过 ssrLoadModule 加载时不会默认使用 node_modules 源码
          // 配合预编译逻辑，将非标准包支持 node 环境下加载执行
          noExternal: ['create-app-shared', 'react-app-renderer', 'miniapp-history'],
        },
      } as UserConfig;
    },
    configResolved(resolvedConfig) {
      resolvedConfig.resolve.alias.push({
        // universal-env 写法非标准
        find: /universal-env$/,
        replacement: '@uni/env',
      });
      resolvedConfig.optimizeDeps.include = resolvedConfig.optimizeDeps.include || [];
      // pre-build invalid package for ssr render
      resolvedConfig.optimizeDeps.include.push(...invalidPackages);
    },
    configureServer: async (server) => {
      const handler = createSSRDevHandler(server, { ssrEntry});
      return () => server.middlewares.use(handler);
    },
  };
};

export default vitePluginSSR;
