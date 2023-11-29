---
title: 使用原子化 CSS 能力
order: 0701
---

原子化 CSS 是一种 CSS 写法，它将 CSS 样式拆分成一个个独立的样式，每个样式只包含一个属性，比如：

```css
/* 原子化 CSS */
.mt-10 {
  margin-top: 10px;
}
```

通过原子化 CSS 能力，可以方便地支持响应式布局，以及减少 CSS 文件体积。

ice.js 官方提供了 `@ice/plugin-unocss` 插件，可以方便开发这一键开启原子化 CSS 能力。

## 开启插件

安装插件：
  
```bash
$ npm i -D @ice/plugin-unocss
```

在 `ice.config.mts` 中添加插件：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import Unocss from '@ice/plugin-unocss';

export default defineConfig(() => ({
  plugins: [
    Unocss(),
  ]
}));
```

## 配置

为了方便开发者便捷使用，`@ice/plugin-unocss` 内置了默认的 [preset](https://unocss.dev/presets/uno)，开发者无需额外配置，可以通过插件配置项对内置配置进行覆盖：

```ts title="ice.config.mts"
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

插件配置能力，同 UnoCSS 配置能力保持一致，更多配置能力，请参考 [UnoCSS 配置文档](https://unocss.dev/guide/config-file)。


