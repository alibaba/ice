---
title: 使用 antd 组件
---

icejs 项目中可以直接使用 antd 组件，关于 antd 组件按需引入的问题说明：
- 脚本代码按需引入：不推荐使用 babel-plugin-import，社区主流工具 Webpack/Vite 等都已支持 tree-shaking，构建时默认都会做按需的引入
- 样式代码按需引入：结合社区讨论 [issue](https://github.com/ant-design/ant-design/issues/16600#issuecomment-492572520)，大多数场景下样式按需引入并无太大意义，反而会引入其他工程问题，因此推荐组件样式在项目级全量引入

综上所述，如果不存在主题定制以及样式大小极致的要求，项目中并不需要使用 antd 插件，通过在 `src/global.css` 中全量引入样式即可：

```css title="src/global.css"
@import 'antd/dist/antd.css';

body {}
```

## 开启插件

安装插件：

```bash
$ npm i -D @ice/plugin-antd
```

在 `ice.config.mts` 中添加插件：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import antd from '@ice/plugin-antd';

export default defineConfig({
  plugins: [
    antd({
      importStyle: true,
    }),
  ],
});
```

## 配置

### importStyle

- 类型: `boolean`
- 默认值: `false`

为 antd 组件按需加载样式。

### dark

- 类型: `boolean`
- 默认值: `false`

开启暗色主题。

### compact

- 类型: `boolean`
- 默认值: `false`

开启紧凑主题。

### theme

- 类型: `Record<string, string>`
- 默认值: `{}`

配置 antd 的 theme 主题，配置形式如下：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import antd from '@ice/plugin-antd';

export default defineConfig({
  plugins: [
    antd({
      theme: {
        // primary-color 为 antd 的 theme token
        'primary-color': '#1DA57A',
      },
    }),
  ],
});
```