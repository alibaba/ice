---
title: 样式方案
order: 3
---

本文讲述如何在项目中书写样式。

## CSS Reset

对于默认的 HTML 标签，不同的浏览器都有自己默认的一些样式，如果不重置这些样式，可能会导致同一份前端代码在不同的浏览器上显示不一致。在 Fusion 基础组件中提供了 `reset.scss` 用来重置不同浏览器的默认样式，开发者只需要在入口文件 `src/index.js` 中一次性引入这个文件即可：

```jsx
import ReactDOM from 'react-dom';

// 载入默认全局样式 normalize
import '@alifd/next/reset.scss';

import router from './router';

ReactDOM.render(router(), document.getElementById('ice-container'));
```

如果项目中有自身的全局样式，只需要新建一个 `src/global.scss` 文件，并在入口文件里一起引入即可。

## CSS/Sass/Less

如果你只是想为某些组件或者某个标签书写样式，那么你可以通过 CSS/Sass/Less 的方案。

首先在组件目录下新建 index.jsx 和 index.scss 两个文件，在 index.jsx 中引入 scss 文件：

```jsx
// ./components/UserCard/index.jsx
// 引入组件样式
import './index.scss';

function UserCard(props) {
  return (
    <div className="user-card">
      <span className="nick">{props.nick}</span>
    </div>
  );
}
```

然后在 index.scss 中完善样式：

```scss
// ./components/UserCard/index.scss
// 选择器与 className 保持一致
.user-card {
  color: red;

  .nick {
    font-size: 14px;
  }
}
```

这里需要注意 CSS 默认都是全局的，因此我们需要将组件的样式都收敛到某个 className 下，防止因为同名 className 产生样式冲突。

## CSS Modules：推荐

与上面的方案相比，[CSS Modules](https://github.com/css-modules/css-modules) 可以有效解决样式冲突等问题，因此我们推荐使用 CSS Modules 的方案书写样式：

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