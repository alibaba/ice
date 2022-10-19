import path from 'path';
import consola from 'consola';
import chalk from 'chalk';
import type { Plugin } from '@ice/types';
import getMiniappTask from './miniapp/index.js';
import { ALL_PLATFORMS, WEB } from './constant.js';

interface MiniappOptions {
  // TODO: specify the config type of native.
  nativeConfig: any;
}

const plugin: Plugin<MiniappOptions> = () => ({
  name: '@ice/plugin-miniapp',
  setup: ({ registerTask, onHook, context, dataCache, generator }) => {
    const { commandArgs, rootDir, command } = context;
    const { platform } = commandArgs;
    if (platform !== WEB && ALL_PLATFORMS.includes(platform)) {
      const configAPI = {
        getAppConfig: async () => ({}),
        getRoutesConfig: async () => ({}),
      };
      // Recommand add @ice/miniapp-runtime in dependencies when use pnpm.
      // Use `@ice/miniapp-runtime/esm/app` for vscode type hint.
      const miniappRuntime = '@ice/miniapp-runtime/esm/app';
      generator.addExport({
        specifier: [
          'defineAppConfig',
          'useAppData',
          'useData',
          'useConfig',
          'Link',
          'useSearchParams',
          'history',
        ],
        source: miniappRuntime,
      });
      generator.modifyRenderData((renderData) => {
        return {
          ...renderData,
          iceRuntimePath: miniappRuntime,
        };
      });
      // Get server compiler by hooks
      onHook(`before.${command as 'start' | 'build'}.run`, async ({ getAppConfig, getRoutesConfig }) => {
        configAPI.getAppConfig = getAppConfig;
        configAPI.getRoutesConfig = getRoutesConfig;
      });
      registerTask('miniapp', getMiniappTask({
        rootDir,
        command,
        platform,
        configAPI,
        dataCache,
        runtimeDir: '.ice',
        cacheDir: path.join(rootDir, 'node_modules/.cache'),
      }));
      onHook('after.start.compile', async ({ isSuccessful, isFirstCompile }) => {
        if (isSuccessful && isFirstCompile) {
          let logoutMessage = '\n';
          logoutMessage += chalk.green(`Use ${platform} developer tools to open the following folder:`);
          logoutMessage += `\n${chalk.underline.white(rootDir)}`;
          consola.log(`${logoutMessage}\n`);
        }
      });
    }
  },
});

export default plugin;
