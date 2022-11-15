---
title: CSS 资源本地化
---

:::caution
小程序端不支持该能力。
:::

组件代码里有可能会依赖一些远程 CDN 的字体文件等，某些情况下网站运行时可能访问不了。该插件提供在构建部署时将 CSS 中的网络资源本地化能力，例如字体文件等。

## 开启插件

安装插件：

```bash
$ npm i -D @ice/plugin-css-assets-local
```

在 `ice.config.mts` 中添加插件：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import cssAssetsLocal from '@ice/plugin-css-assets-local';

export default defineConfig(() => ({
  plugins: [
    cssAssetsLocal(),
  ],
}));
```

## 配置

### `outputPath`

提取后的静态文件目录前缀

- 类型: `string`
- 默认值: `assets`

### `relativeCssPath`

提取的文件后相对于 CSS 的路径

- 类型: `string`
- 默认值: `../`

### `enableInDev`

本地调试时是否启用插件

- 类型: `boolean`
- 默认值: `false`
