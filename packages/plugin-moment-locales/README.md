# @ice/plugin-moment-locales

ice.js Plugin for load moment locales and reduce size of moment.

## Usage

```js
import { defineConfig } from '@ice/app';
import moment from '@ice/plugin-moment-locales';

export default defineConfig(() => ({
  plugins: [
    moment({
      locales: ['zh-CN'],
    }),
  ],
}));
```
