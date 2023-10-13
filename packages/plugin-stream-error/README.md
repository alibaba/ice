# @ice/plugin-stream-error

A plugin for re-render app when stream error.

## Usage

```ts
import { defineConfig } from '@ice/app';
import streamError from '@ice/plugin-stream-error';

export default defineConfig(() => ({
  plugins: [
    streamError(),
  ],
}));
```

> Causion: This plugin only works when stream content ends with javascripts which triggered an custom event of `stream_end`
