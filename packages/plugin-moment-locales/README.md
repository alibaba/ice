# @ice/plugin-moment-locales

plugin for load moment locales and reduce size of moment

## Usage

```js
import { defineConfig } from '@ice/app';
import moment from '@ice/plugin-moment-locale';

export default defineConfig({
  plugins: [moment({
    locales: ['zh-CN']
  })],
});
```