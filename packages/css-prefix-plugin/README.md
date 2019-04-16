# css-prefix-plugin

A webpack plugin for adding css prefix of component package.

## Install

```
npm install css-prefix-plugin --save-dev
```

## Usage

### webpack config

```js
const webpack = require('webpack');
const ExtractTextPlugin = require('css-prefix-plugin');

module.exports = {
  ...

  plugins: [
    new CssPrefixPlugin({ '$css-prefix': 'ice-' }),
  ],

  ...
};
```

## Options

- `matchFile`(RegExp)：The path to find the variable scss in component package, default value is `/@alifd\/next\/lib\/(.+).scss$/`
- `$css-prefix`(String)： Inject css prefix to build variable scss

  - `{ '$css-prefix': 'ice-' }`
