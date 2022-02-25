# @ice/types

`@ice/types` provides basic types of webpack framework `ice`.

## Usage

develop plugin for ice:

```js
// src/index.ts
import type { Plugin } from '@ice/types';

const plugin: Plugin = () => {};
export default plugin;
```

develop runtime plugin for ice:

```js
// runtime/index
import type { RuntimePlugin } from '@ice/types';

const runtime: RuntimePlugin = () => {};
export default runtime;
```
