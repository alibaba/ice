---
title: 升级指南
order: 6
---

## build-plugin-component 从 0.2.x 升级到 1.x

1.x 主要是支持了 Rax 的组件构建，跟 0.2.x 基本兼容，只需要将 `demo/a.md` 中的代码片段写法修正即可：

`````diff
- ````js
+ ```js
import ExampleComponent from '@ali/example-component';

ReactDOM.render((
  <App />
), mountNode);
- ````
+ ```
`````

## 从 ice-scripts 升级到 build-scripts

组件/区块开发从 ice-scripts 升级到 build-scripts。

依赖更新：

```bash
$ npm i --save-dev @alib/build-scripts build-plugin-component build-plugin-fusion build-plugin-moment-locales
$ npm rm --save-dev ice-scripts ice-plugin-component ice-plugin-fusion ice-plugin-moment-locales
```

> 如果是区块开发则将 build-plugin-component 改为 build-plugin-block

删除 `ice.config.js` 并新增 `build.json` 文件：

```json
{
  "plugins": [
    "build-plugin-component",
    ["build-plugin-fusion"],
    [
      "build-plugin-moment-locales",
      {
        "locales": [
          "zh-cn"
        ]
      }
    ]
  ]
}
```

> 如果是区块开发则将 build-plugin-component 改为 build-plugin-block

`package.json` 字段更新：

```diff
{
  "scripts": {
-    "start": "ice-scripts start",
+    "start": "build-scripts start",
-    "build": "ice-scripts build",
+    "build": "build-scripts build",
    "prepublishOnly": "npm run build"
  }
}
```
