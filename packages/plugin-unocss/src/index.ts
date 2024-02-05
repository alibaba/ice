import * as path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from '@ice/app/types';
import type { UserConfig } from '@unocss/core';
import presetUno from '@unocss/preset-uno';

const PLUGIN_NAME = '@ice/plugin-unocss';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const plugin: Plugin<UserConfig> = (options) => ({
  name: PLUGIN_NAME,
  setup: ({ generator, onGetConfig }) => {
    // Import uno.css in entry, when uno mode is global or dist-chunk.
    generator.addEntryImportAhead({
      source: 'uno.css',
    });

    // Register webpack plugin of unocss.
    const unoPreset = '@unocss/preset-uno';
    const hasPresetUno = options?.presets?.some((preset) => {
      return Array.isArray(preset)
        ? preset.some((item) => item?.name === unoPreset)
        : preset?.name === unoPreset;
    });

    const unoConfig: UserConfig = options ? {
      ...options,
      presets: [
        // Add default preset if option is null.
        ...(hasPresetUno ? [] : [presetUno()]),
        ...(options.presets ?? []),
      ],
    } : {
      presets: [
        // Add default preset if option is null.
        presetUno(),
      ],
    };
    onGetConfig((config) => {
      config.alias = {
        ...config.alias,
        'uno.css': path.join(__dirname, '../uno.css'),
      };
      config.postcss = {
        plugins: [['@unocss/postcss', {
          configOrPath: unoConfig,
        }]],
      };
    });
  },
});

export default plugin;
