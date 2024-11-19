import path from 'path';
import { createRequire } from 'module';
import consola from 'consola';
import chalk from 'chalk';
import type { Plugin } from '@ice/app/esm/types';
import getMiniappTask from './miniapp/index.js';
import { MINIAPP_TARGET_FOLDER_NAMES, MINIAPP_TARGETS } from './constant.js';

interface MiniappOptions {
  // TODO: specify the config type of native.
  nativeConfig?: Record<string, any>;
}

const _require = createRequire(import.meta.url);
const packageJSON = _require('../package.json');
const { name: PLUGIN_NAME } = packageJSON;

const plugin: Plugin<MiniappOptions> = (miniappOptions = {}) => ({
  name: PLUGIN_NAME,
  setup: ({ registerTask, onHook, context, generator, modifyUserConfig }) => {
    const { nativeConfig = {} } = miniappOptions;
    const { commandArgs, rootDir, command } = context;
    const { target } = commandArgs;
    if (MINIAPP_TARGETS.includes(target)) {
      const configAPI = {
        getAppConfig: async () => ({}),
        getRoutesConfig: async () => ({}),
      };
      // Recommand add @ice/miniapp-runtime in dependencies when use pnpm.
      // Use `@ice/miniapp-runtime/esm/app` for vscode type hint.
      const miniappRuntime = '@ice/miniapp-runtime/esm/app';
      const importSpecifiers = [
        'defineAppConfig',
        'useAppData',
        'useData',
        'useConfig',
        'Link',
        'useSearchParams',
        'history',
        'defineDataLoader',
        'usePageLifecycle',
        'withSuspense',
        'useSuspenseData',
      ];
      generator.addRenderFile('core/entry.client.tsx.ejs', 'entry.miniapp.tsx', {
        iceRuntimePath: miniappRuntime,
        enableRoutes: false,
      });

      generator.addRenderFile('core/index.ts.ejs', 'index.miniapp.ts', {
        framework: {
          imports: `import { ${importSpecifiers.join(',\n')} } from '${miniappRuntime}';`,
          exports: importSpecifiers.join(',\n'),
        },
      });
      generator.addRuntimeOptions({
        source: `${PLUGIN_NAME}/targets/${MINIAPP_TARGET_FOLDER_NAMES[target]}/runtime.js`,
      });
      modifyUserConfig('optimization', {
        router: false,
        disableRouter: true,
      });
      // Get server compiler by hooks
      onHook(`before.${command as 'start' | 'build'}.run`, async ({ getAppConfig, getRoutesConfig }) => {
        configAPI.getAppConfig = getAppConfig;
        configAPI.getRoutesConfig = getRoutesConfig;
      });
      registerTask(
        'miniapp',
        getMiniappTask({
          rootDir,
          command,
          target,
          configAPI,
          runtimeDir: '.ice',
          nativeConfig,
        }),
      );
      onHook(`after.${command as 'start' | 'build'}.compile`, async ({ isSuccessful, isFirstCompile }) => {
        const shouldShowLog = isSuccessful && ((command === 'start' && isFirstCompile) || command === 'build');
        if (shouldShowLog) {
          let logoutMessage = '\n';
          logoutMessage += chalk.green(`Use ${target} developer tools to open the this project or build folder`);
          consola.log(`${logoutMessage}\n`);
        }
      });
    }
  },
  runtime: `${PLUGIN_NAME}/runtime`,
});

export default plugin;
