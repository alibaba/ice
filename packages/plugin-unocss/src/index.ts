import type { Plugin } from '@ice/app/types';
import UnocssWebpackPlugin from '@unocss/webpack';
import type { UserConfig } from '@unocss/core';
import { presetUno } from 'unocss';

const PLUGIN_NAME = '@ice/plugin-unocss';

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
      config.configureWebpack ??= [];
      config.configureWebpack.push((webpackConfig) => {
        // @ts-expect-error
        webpackConfig.plugins.push(UnocssWebpackPlugin({}, unoConfig));
        return webpackConfig;
      });
    });
  },
});

export default plugin;
