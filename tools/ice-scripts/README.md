# ice scripts

Cli dev tool for ice.

## Install

```bash
npm install ice-scripts --save-dev # -g for global
```

## Cli

```
Usage: ice <command> [options]

Options:

  -V, --version  output the version number
  -h, --help     output usage information

Commands:

  build          build project
  dev            start server
  init           init project by scaffold
  help [cmd]     display help for [cmd]
```

## Methods

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

await init({
  customWebpackConfig: {},
  // ref to bin/ice-build.js
  cliOptions: {}
});
```