# ice-scripts-plugin-fusion

ice-scripts plugin for project use fusion components

## Features

- 组件按需加载
- 组件（包含业务组件）样式自动引入
- 主题定制能力
- 多个不同包名的基础组件统一

## Usage

Install npm:

```bash
$ npm i --save-dev ice-scripts-plugin-fusion
```

Add config to `ice.config.js`:

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-scripts-plugin-fusion', {
      // 主题包
      themePackage: '@icedesign/theme',
      themeConfig: {
        // 自定义 css prefix，需要配合 ConfigProvider 更改 js 的 prefix
        nextPrefix: 'nextfd-',
        // 根据配置推导主品牌色
        primaryColor: '#f60',
        // 根据配置推导次品牌色，仅组件 0.x 版本支持
        secondaryCorlor: '#f60',
        // 覆盖 scss 原始变量
        'font-size-body-1': '14px',
      },
      // @icedesign/base | @alife/next | @ali/ice -> @alife/next
      uniteBaseComponent: '@alife/next'
    }]
  ]
}
```