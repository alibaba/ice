# ice scripts

Cli dev tool for ice.

## Install

```bash
$ npm install ice-scripts -g

$ ice --help
```

## Cli

> Recommended cli way

```
$ mkdir ice-project
$ cd ice-project

$ ice init
$ ice dev
$ ice build
```

## Methods

> Not recommended

### init({ scaffold })

init project by scaffold:

```js
const { init } = require('ice-scripts');

await init({
  scaffold: '@icedesign/lite-scaffold'
});
```

### build({ customWebpackConfig, cliOptions })

build project:

```js
const { build } = require('ice-scripts');

await build({
  customWebpackConfig: {},
  // ref to bin/ice-build.js
  cliOptions: {}
});
```