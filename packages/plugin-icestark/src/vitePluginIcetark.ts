import type { Plugin } from 'vite';
import type { PluginContext } from 'build-scripts';

export const icestarkPlugin = ({ userConfig }: PluginContext): Plugin => {
  const { entry } = userConfig;

  // FIXME: 1. handle mpa
  // FIXME: 2. output correct html
  const input = {
    index: entry as string,
  };

  return ({
    name: 'vite-plugin-icestark',
    enforce: 'pre',
    apply: 'build',
    config(cfg) {
      cfg.build = {
        ...cfg.build,
        rollupOptions: {
          ...cfg?.build?.rollupOptions,
          preserveEntrySignatures: 'exports-only',
          output: {
            ...cfg?.build?.rollupOptions?.output,
            format: 'es',
          },
          input,
        },
      };
    }
  }

  );
};
