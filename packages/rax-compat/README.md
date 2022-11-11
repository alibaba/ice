# rax-compat

A runtime polyfill, for writing rax, but rendering in real React.

## Usage

```js
import { createElement } from 'rax-compat';

export default function() {
  return createElement('div', null, 'Hello World');
}
```

Also works with JSX, should be configured with packer(webpack/turbopack).

See also [@ice/plugin-rax-compat](https://www.npmjs.com/package/@ice/plugin-rax-compat).
