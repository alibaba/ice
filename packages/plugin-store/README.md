# @ice/plugin-store

A plugin of state management base on Redux and React Redux used in ice.js`.

## Usage

```ts
import { defineConfig } from '@ice/app';
import store from '@ice/plugin-store';

export default defineConfig(() => ({
  plugins: [
    store(),
  ],
}));
```

## Options

- `disableResetPageState` 
  - The default value is `false`.
  - After it is turned on, the page state will not be reinitialized after switching the page and entering the original page again.
