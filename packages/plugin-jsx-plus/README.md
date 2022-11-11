# @ice/plugin-jsx-plus

This plugin adds support for JSX+ syntax to the ice.js.

## Definition of JSX Plus

https://github.com/jsx-plus/jsx-plus

## Usage

```js
import { defineConfig } from '@ice/app';
import jsxplus from '@ice/plugin-jsx-plus';

export default defineConfig(() => ({
  plugins: [
    jsxplus({
      // options
    }),
  ],
}));
```

## Options

- `include`: `(string | RegExp)[]`
  - Files to be included.
  - Default: the project `src` directory.
- `exclude`: `(string | RegExp)[]`
  - Files to be excluded.
  - Default: `[]`
- `extensions`: `string[]`
  - File extensions to be processed.
  - Default: `['.jsx', '.tsx']`

> If `include` and `exclude` are both set, `exclude` will be priority executed.
