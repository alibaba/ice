import { merge, cloneDeep } from 'lodash-es';

import type { NormalizedRaxCompatPluginOptions, PluginAPI } from '../typings';

export class JSXService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static provide(api: PluginAPI, options: NormalizedRaxCompatPluginOptions) {
    api.onGetConfig((config) => {
      const originalSwcCompilationConfig =
        typeof config.swcOptions?.compilationConfig === 'object' ? cloneDeep(config.swcOptions.compilationConfig) : {};

      const originalSwcCompilationConfigFunc =
        typeof config.swcOptions?.compilationConfig === 'function'
          ? config.swcOptions.compilationConfig
          : () => originalSwcCompilationConfig;

      // Reset jsc.transform.react.runtime to classic.
      config.swcOptions = merge(config.swcOptions || {}, {
        compilationConfig: (source: string, id: string) => {
          let swcCompilationConfig = {};
          const hasJSXComment = source.indexOf('@jsx createElement') !== -1;
          const isRaxComponent = /(from|require\()\s*['"]rax['"]/.test(source);

          if (hasJSXComment) {
            swcCompilationConfig = {
              jsc: {
                transform: {
                  react: {
                    runtime: 'classic',
                  },
                },
              },
            };
          } else if (isRaxComponent) {
            swcCompilationConfig = {
              jsc: {
                transform: {
                  react: {
                    importSource: 'rax-compat/runtime',
                  },
                },
              },
            };
          }

          return merge({}, originalSwcCompilationConfigFunc(source, id), swcCompilationConfig);
        },
      });
    });
  }
}
