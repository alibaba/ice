# @ice/plugin-rax-compat

An ice.js plugin for migrating `rax-app` projects.

## Usage

Add plugin in `ice.config.mts`:

```js
import { defineConfig } from 'ice';
import compatRax from '@ice/plugin-rax-compat';

export default defineConfig(() => ({
  plugins: [compatRax({ /* options */ })],
}));
```

## Options

- `inlineStyle`: 
  - default to `false`.
  - Enable stylesheet loader to import CSS files.
  
