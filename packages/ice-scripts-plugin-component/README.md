# ice-scripts-plugin-component

ice-scripts plugin for component development

## Features

- 支持组件模块开发 dev & build
- 支持接入 Fusion Cool & 设计板块的组件构建

## Usage

Install npm:

```bash
$ npm i --save-dev ice-scripts-plugin-component
```

Add plugin to `ice.config.js`:

```js
// ice.config.js
// default is support fusion component, will compile index.scss and style.js
module.exports = {
  plugins: [
    'ice-scripts-plugin-component'
  ]
}
```

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-scripts-plugin-component', { type: 'component' }]
  ]
}
```