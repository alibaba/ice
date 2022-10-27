# @ice/plugin-store

A plugin of state management base on Redux and React Redux used in framework `ICE`.

## Usage

```ts
import { defineConfig } from '@ice/app';
import store from '@ice/plugin-store';
export default defineConfig({
  plugins: [
    store(),
  ],
});
```

## Options

- disableResetPageState: 默认值是 `false`。开启后，切换页面再次进入原页面后不会重新初始化页面状态
