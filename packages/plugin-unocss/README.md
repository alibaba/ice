# @ice/plugin-unocss

A plugin for enable unocss in your app based on `@ice/app`.


## Usage

Install `@ice/plugin-unocss`:

```bash
$ npm install @ice/plugin-unocss --save-dev
```

Configure it in `ice.config.mts`:

```ts
import { defineConfig } from '@ice/app';
import Unocss from '@ice/plugin-unocss';

export default defineConfig(() => ({
  plugins: [
    Unocss(),
  ]
}));
```

## Plugin Options

Plugin options is as same as [UnoCSS ConfigFle](https://unocss.dev/guide/config-file).

Plugin has a default preset `@unocss/preset-uno` for UnoCSS. You can pass options of presets to override the default preset:

```ts
import { defineConfig } from '@ice/app';
import Unocss from '@ice/plugin-unocss';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig(() => ({
  plugins: [
    Unocss({
      shortcuts: [
        // ...
      ],
      theme: {
        colors: {
          // ...
        }
      },
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
        presetWebFonts({
          fonts: {
            // ...
          },
        }),
      ],
      transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
      ],
    }),
  ],
}));
```
