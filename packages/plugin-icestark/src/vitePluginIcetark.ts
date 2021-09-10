import type { Plugin } from 'vite';

export interface Entries {
  [index: string]: string | string[];
}

export const icestarkPlugin = (entries: Entries): Plugin => {
  // Turn vite input to js files
  const input = Object.keys(entries).reduce((pre, next) => {
    return {
      ...pre,
      [next]: Array.isArray(entries[next]) ? entries[next][0] : entries[next]
    };
  }, {});

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
