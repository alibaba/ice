---
title: 样式
order: 5
---

默认推荐使用 CSS Modules 方案，这能很好的解决样式开发中的 **全局污染** 和 **命名混乱** 的两个痛点问题。但同时也支持 Sass、Less 等编写样式。


## 全局样式

对于整个项目的全局样式，统一定义在 `src/global.less` 文件中，框架会默认引入该文件：

```less
// 该文件会被默认引用

body {
  -webkit-font-smoothing: antialiased;
}
```

## 局部样式

对于页面级和组件级的样式，具体规范规则如下：

- 文件名：约定文件名格式如 `xxx.module.less`
- 模块化：一个页面或者一个组件对应一个样式文件

```markdown
Home
├── index.module.less
└── index.jsx
```

在页面目录下新建 `index.jsx` 和 `index.module.less` 两个文件：

```less
// ./pages/Home/index.module.less
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

在文件中引入对应的样式文件，并将 className 与对应样式关联：

```jsx
// ./pages/Home/index.jsx
import styles from './index.module.less';

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
div class="container--1DTudAN">title</div>
```

## 尺寸单位

rpx(responsive pixel) 是小程序开发推荐的样式单位，它可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则 750rpx = 375px = 750 物理像素，1rpx = 0.5px = 1 物理像素。

|    设备     | rpx 换算 px (屏幕宽度/750)    | px 换算rpx (750/屏幕宽度)  |
| ----------  | ---                        |  ---                     |
| iPhone5     |  1rpx = 0.42px = 100/750vw | 1px = 2.34rpx = 234/750vw|
| iPhone6     |  1rpx = 0.5px = 100/750vw  | 1px = 2rpx = 200/750vw   |
| iPhone6 Plus|  1rpx = 0.552px = 100/750vw| 1px = 1.81rpx = 181/750vw|

> 建议开发小程序页面时使用 750 作为设计稿的标准

## 其他

更多 CSS Modules 文档请参考：

* [CSS Modules 官方文档](https://github.com/css-modules/css-modules)
* [CSS Modules 详解及 React 中实践](https://zhuanlan.zhihu.com/p/20495964)
