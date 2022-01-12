# @ice/runtime

runtime dependencies for ice plugin

## compile

该包是一个包集合，因此推荐的使用方式如下：

```js
import { axios } from '@ice/runtime/axios';
```

大致的思路:

1. 使用 `exports` 语法（由于此包由 webpack5 加载，不存在兼容性问题）

```json
"exports": {
  ".": "./lib/index.js",
  "./axios": "./lib/axios.js",
  "./axiosUtils": "./lib/axiosUtils.js",
  "./createAppShared": "./lib/createAppShared.js",
  "./history": "./lib/history.js",
  "./iceStore": "./lib/iceStore.js",
  "./loadable": "./lib/loadable.js",
  "./pathToRegexp": "./lib/pathToRegexp.js",
  "./queryString": "./lib/queryString.js",
  "./reactAppRenderer": "./lib/reactAppRenderer.js",
  "./reactRouter": "./lib/reactRouter.js",
  "./reactRouterDom": "./lib/reactRouterDom.js",
  "./useRequest": "./lib/useRequest.js"
}
```

但是 [类型问题暂时不好解决](https://www.typescriptlang.org/docs/handbook/esm-node.html)。

2. 所以目前的办法是把所有文件打包至与 package.json 同级的目录，则可以使用上面的用法，类型也没有问题
