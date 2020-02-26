---
title: 样式方案
order: 9
---

icejs 在工程能力上基本支持了所有社区主流样式方案，包括 Sass、Less、CSS Modules、Stylus 等方案，而作为框架配套的模板我们推荐使用 [CSS Modules](https://github.com/css-modules/css-modules) 方案。

## 全局样式

对于整个项目的全局样式，统一定义在 `src/global.[scss|less|scss]` 文件中，框架会默认引入该文件：

```scss
// 引入默认全局样式
@import '@alifd/next/reset.scss';

body {
  -webkit-font-smoothing: antialiased;
}
```

## 局部样式

对于页面级和组件级的样式，我们推荐使用 CSS Modules 的方案，这能很好的解决样式开发中的两个痛点问题：

* **全局污染**：CSS 使用全局选择器机制来设置样式，优点是方便重写样式。缺点是所有的样式都是全局生效，样式可能被错误覆盖，因此产生了非常丑陋的 `!important`，甚至 inline `!important` 等问题。
* **命名混乱**：由于全局污染的问题，多人协同开发时为了避免样式冲突，选择器越来越复杂，容易形成不同的命名风格，很难统一，样式变多后，命名将更加混乱。

具体规范规则如下：

* 文件名：约定文件名格式如 `xxx.module.scss`
* 模块化：一个页面或者一个组件对应一个样式文件

```markdown
Home
├── index.module.scss
└── index.tsx
```

在页面目录下新建 `index.jsx` 和 `index.module.scss` 两个文件：

```scss
// ./pages/Home/index.module.scss
.container {
  background: #fff;
}

/* 也可通过 :global 定义全局样式 */
:global {
  .container {
    a {
      color: blue;
    }
  }
}
```

在文件中引入对应的样式文件，并将 `className` 与对应样式关联：

```javascript
// ./pages/Home/index.jsx
import styles from './index.module.scss';

function Home() {
  return (
    <div className={styles.container}>
      <h2>CSS Modules</h2>
    </div>
  );
}
```

使用该方案之后，上文中的 className 都会被编译为唯一性的名字，避免因为重名 className 而产生样式冲突，如果在浏览器里查看这个示例的 dom 结构，你会发现实际渲染出来是这样的：

```jsx
<div class="container--1DTudAN">title</div>
```

更多 CSS Modules 文档请参考：

* [css-modules 官方文档](https://github.com/css-modules/css-modules)
* [CSS Modules 详解及 React 中实践](https://zhuanlan.zhihu.com/p/20495964)
