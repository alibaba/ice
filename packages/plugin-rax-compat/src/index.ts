import { AliasService } from './services/alias';
import { StyleService } from './services/styles';
import { JSXService } from './services/jsx';
import { TypingsService } from './services/typings';

import type { Plugin } from '@ice/app/types';
import type { NormalizedRaxCompatPluginOptions, RaxCompatPluginOptions } from './typings';

const normalizeOptions = (options?: RaxCompatPluginOptions): NormalizedRaxCompatPluginOptions => {
  const { inlineStyle = false, cssModule = true, legacy = false } = options ?? {};

  return {
    inlineStyle,
    cssModule,
    legacy,
  };
};

const RaxCompatPlugin: Plugin<RaxCompatPluginOptions> = (options?: RaxCompatPluginOptions) => {
  return {
    name: '@ice/plugin-rax-compat',
    setup: (api) => {
      const normalizedOptions = normalizeOptions(options);

      TypingsService.provide(api, normalizedOptions);
      AliasService.provide(api, normalizedOptions);
      JSXService.provide(api, normalizedOptions);
      StyleService.provide(api, normalizedOptions);
    },
  };
};

export default RaxCompatPlugin;
