# ice-scripts

A cli tool for React Development. [Docs](https://ice.work/docs/basis/ice-scripts).

## Install

```bash
$ npm install ice-scripts -g

$ ice --help
```

## Cli

> Recommended

```bash
$ mkdir ice-project
$ cd ice-project

# support init project/component/block
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
  template: '@icedesign/lite-scaffold',
  // Default: process.cwd()
  projectDir: ''
  // component/block/project, Default: project
  type: ''
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