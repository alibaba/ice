---
title: 本地开发使用 BrowserRouter
order: 2
---

## 修改配置

创建 `.webpackrc.js` 文件

```js
module.exports = {
  devServer: {
    historyApiFallback: true
  }
};
```

## 修改 `router.jsx`

将 `HashRouter` 修改为 `BrowserRouter`

```diff
-import { HashRouter as Router } from 'react-router-dom';
+import { BrowserRouter as Router } from 'react-router-dom';
```

完成上述修改后，本地开发就可以使用 BrowserRouter 了。