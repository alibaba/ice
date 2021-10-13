# vite-plugin-eslint-reporting

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

Check every file when build project.
Set to `true` for increment check.
