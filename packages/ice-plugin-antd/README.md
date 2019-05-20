# ice-plugin-antd

ice-scripts plugin for project use antd components

## Features

- 组件按需加载
- 主题定制能力

## Usage

Install npm:

```bash
$ npm i --save-dev ice-plugin-antd
```

Add config to `ice.config.js`:

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-antd', {
      themeConfig: {
        'primary-color': '#1DA57A',
        'link-color': '#1DA57A',
        'border-radius-base': '2px',
      }
    }]
  ]
}
```