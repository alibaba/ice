---
title: 使用 fusion 组件
---

icejs 项目中可以直接使用 fusion 组件，关于 fusion 组件按需引入的问题说明：
- 脚本代码按需引入：不推荐使用 babel-plugin-import，社区主流工具 Webpack/Vite 等都已支持 tree-shaking，构建时默认都会做按需的引入
- 样式代码按需引入：结合社区讨论 [issue](https://github.com/ant-design/ant-design/issues/16600#issuecomment-492572520)，大多数场景下样式按需引入并无太大意义，反而会引入其他工程问题，因此推荐组件样式在项目级全量引入

综上所述，如果不存在主题定制以及样式大小极致的要求，项目中并不需要使用 fusion 插件，通过在 `src/global.css` 中全量引入样式即可：

```css title="src/global.css"
@import '@alifd/next/dist/next.var.css';

body {}
```

## 开启插件

安装插件：

```bash
$ npm i -D @ice/plugin-fusion
```

在 `ice.config.mts` 中添加插件：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import fusion from '@ice/plugin-fusion';

export default defineConfig(() => ({
  plugins: [
    fusion({
      importStyle: true,
    }),
  ],
}));
```

## 配置

### importStyle

- 类型: `boolean|'sass'`
- 默认值: `false`

为 fusion 组件按需加载样式，目前 fusion 组件提供两种类型样式，默认加载 `css` 样式，如果希望加载 `sass` 样式可以将 `importStyle` 配置为 `sass`。

### themePackage

- 类型: `string`
- 默认值: `''`

为 fusion 组件配置主题包，比如：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import fusion from '@ice/plugin-fusion';

export default defineConfig(() => ({
  plugins: [
    fusion({
      themePackage: '@alifd/theme-design-pro',
    }),
  ],
}));
```

### theme

- 类型: `Record<string, string>`
- 默认值: `{}`

配置 antd 的 theme 主题，配置形式如下：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import fusion from '@ice/plugin-fusion';

export default defineConfig(() => ({
  plugins: [
    fusion({
      theme: {
        'css-prefix': 'next-icestark-',
      },
    }),
  ],
}));
```
