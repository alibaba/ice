# `plugin-fusion`

plugin for use fusion component in framework `ice`.

## Usage

```js
import { defineConfig } from '@ice/app';
import fusion from '@ice/plugin-fusion';

export default defineConfig({
  plugins: [fusion({
    importStyle: true,
    themePackage: '@alifd/theme-design-pro',
    theme: {
      'primary-color': '#fff',
    },
  })],
});
```

## Options

- importStyle: 开启后 Fusion 组件样式将自动引入
- themePackage: Fusion 组件主题包配置，如果设置为数组则启动多主题能力
- theme: 主题配置，通过设置 sass 变量对现有主题进行覆盖

