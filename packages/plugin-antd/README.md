# `@ice/plugin-antd`

ICE plugin for use `antd`.

## Usage

```js
import { defineConfig } from '@ice/app';
import antd from '@ice/plugin-antd';

export default defineConfig({
  plugins: [antd({
    dark: true,
    compact: true,
    theme: {
      'primary-color': '#fd8',
    }
  })],
});
```