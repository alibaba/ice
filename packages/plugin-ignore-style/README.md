# build-plugin-ignore-style

ignore style of component with modular imported by babel-plugin-import

## Example

```json
{
  "plugins": ["build-plugin-ignore-style", {
    "libraryName": "@alifd/next"
  }]
}
```

style imported below will not been compiled

```js
import '@alifd/next/lib/button/style';
import '@alifd/next/lib/button/style.js';
import '@alifd/next/lib/button/style/index.js';
import '@alifd/next/es/button/style';
import '@alifd/next/es/button/style.js';
import '@alifd/next/es/button/style/index.js';
```

config multi library

```json
{
  "plugins": ["build-plugin-ignore-style", [
    {
      "libraryName": "@alifd/next",
      "style": "style2"
    },
    {
      "libraryName": "antd"
    }
  ]]
}
```

config custom style regexp

```json
{
  "plugins": ["build-plugin-ignore-style", [
    {
      "rule": "@alifd/next/.*\\.scss"
    },
  ]]
}
```
