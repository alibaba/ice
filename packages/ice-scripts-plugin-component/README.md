# ice-scripts-plugin-component

ice-scripts plugin for component development

## Features

支持组件模版开发的dev和build

## Usage

Install npm:

```bash
$ npm i --save-dev ice-plugin-component
```

Add plugin to `ice.config.js`:

```js
// ice.config.js
// default is support fusion component, will compile index.scss and style.js
module.exports = {
  plugins: [
    'ice-plugin-component'
  ]
}
```

```js
// ice.config.js
module.exports = {
  plugins: [
    'ice-plugin-component', { type: 'component' }
  ]
}
```