---
title: 样式方案
order: 6
---

本文介绍了在项目中使用样式的一些最佳实践。

## 全局样式

对于整个项目的全局样式，统一定义在 `src/global.scss` 文件中：

```scss
// 引入默认全局样式
@import '@alifd/next/reset.scss';

body {
  -webkit-font-smoothing: antialiased;
}
```

然后在入口脚本 `src/index.jsx` 里引入样式文件即可：

```js
import React from 'react';
import ReactDOM from 'react-dom';

import './global.scss';

import router from './router';

ReactDOM.render(router(), mountNode);
```

## 局部样式

在页面或者组件中我们推荐使用 [CSS Modules](https://github.com/css-modules/css-modules) 的方式添加样式，可以有效解决样式冲突等问题，书写方式如下：

首先在组件目录下新建 index.jsx 和 index.module.scss 两个文件：

```scss
// ./components/UserCard/index.module.scss
.userCard {
  color: green;
}

.nick {
  font-size: 12px;
}
```

在 jsx 文件中引入对应的样式文件，并将 className 与对应样式关联：

```js
// ./components/UserCard/index.jsx
import styles from './index.module.scss';

function UserCard(props) {
  return (
    <div className={styles.userCard}>
      <span className={styles.nick}>{props.nick}</span>
    </div>
  );
}
```

使用该方案之后，上文中的 nick、userCard 这种 className 都会被编译为唯一性的名字，避免因为重名 className 而产生样式冲突。
