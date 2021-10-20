# vite-plugin-eslint-report

A vite plugin that run eslint

## Getting Started

Install plugin:

```bash
$ npm install vite-plugin-eslint-reporting -D
```

Add it to Vite config:

```js
import eslint from 'vite-plugin-eslint-reporting';

export default {
  plugins: [eslint()],
}
```

## Options

### ignoreInitial

check every file when build project, set to `true` for increment check.

### cache

use eslint cache, default `false`

### configFile
  
specify custom config file for eslint, use `.eslintrc.*` file in project root as default

### exclude

specify files do not need to be lint

### include

specify files to lint, default is `['src/**/*.js','src/**/*.jsx','src/**/*.ts','src/**/*.tsx']`

### formatter

formatter type for output eslint report, use `stylish` as default
