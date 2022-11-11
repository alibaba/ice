# @ice/plugin-fusion

ice.js plugin for using fusion components.

## Usage

```js
import { defineConfig } from '@ice/app';
import fusion from '@ice/plugin-fusion';

export default defineConfig(() => ({
  plugins: [fusion({
    importStyle: true,
    themePackage: '@alifd/theme-design-pro',
    theme: {
      'primary-color': '#fff',
    },
  })],
}));
```

## Options

- importStyle: Fusion component styles will be automatically imported after enabling.
- themePackage: Fusion component theme package configuration, if set to an array, multi-theme capability is enabled.
- theme: theme configuration, overwrite existing themes by setting sass variables.
