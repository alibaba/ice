---
title: 样式
order: 5
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ICE 推荐使用原生 CSS + PostCSS 的方案编写样式，不建议使用 `less/sass` 之类的预编译方案，CSS 写法目前扩展支持了 `@import` 以及嵌套写法。

<Tabs>
<TabItem value="css" label="index.css">

```css
@import './theme.css';

.home {
  color: red;

  h2 {
    display: block;
  }
}
```

</TabItem>
<TabItem value="tsx" label="index.tsx">

```tsx
import './index.css';

function Home() {
  return (
    <div className="home">
      <h2>CSS Modules</h2>
    </div>
  );
}
```

</TabItem>
</Tabs>

> ICE 同时支持 `less/scss` 预编译器，只要保证文件后缀匹配即可。

## 全局样式

对于整个项目的全局样式，统一定义在 `src/global.css` 文件中，框架会默认引入该文件：

```css
body {
  -webkit-font-smoothing: antialiased;
}
```

## 局部样式

对于页面级和组件级的样式，我们推荐使用 CSS Modules 的方案，这能很好的解决样式开发中的两个痛点问题：

1. 全局污染：CSS 使用全局选择器机制来设置样式，优点是方便重写样式。缺点是所有的样式都是全局生效，样式可能被错误覆盖，因此产生了非常丑陋的 !important，甚至 inline !important 等问题。
2. 命名混乱：由于全局污染的问题，多人协同开发时为了避免样式冲突，选择器越来越复杂，容易形成不同的命名风格，很难统一，样式变多后，命名将更加混乱。

具体规范规则如下：

- 文件名：约定文件名格式如 `xxx.module.css`
- 模块化：一个页面或者一个组件对应一个样式文件

如有以下的目录结构和代码：

```
├── src
|  ├── pages
|  |  ├── index.module.css
|  |  └── index.tsx
```

<Tabs>
<TabItem value="css" label="index.module.css">

```css
.container {
  background: #fff;
}
```

</TabItem>
<TabItem value="tsx" label="index.tsx">

```tsx
import styles from './index.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <h2>CSS Modules</h2>
    </div>
  );
}
```

</TabItem>
</Tabs>
使用该方案之后，上文中的 `className` 都会被编译为唯一性的名字，避免因为重名 `class` 而产生样式冲突。如果在浏览器里查看这个示例的 DOM 结构，你会发现实际渲染出来是这样的：

```html
<div class="container--WZ5p3kdM"><h2>CSS Modules</h2></div>
```

同时 CSS Modules 支持 less/scss 预编译器：

```tsx
import lessStyles from './index.module.less';
import scssStyles from './index.module.scss';
 
export default function () {
  return <div className={lessStyles.title}>
    Hello World
    <p className={scssStyles.blue}>I am blue</p>
  </div>;
}
```

更多 CSS Modules 文档请参考：

- [css-modules 官方文档](https://github.com/css-modules/css-modules)
- [CSS Modules 详解及 React 中实践](https://zhuanlan.zhihu.com/p/20495964)

## 常见问题

### 如何覆盖全局基础组件（next/antd）样式

推荐通过 `src/global.css` 覆盖全局样式：

```css title="src/global.css"
body {
  -webkit-font-smoothing: antialiased;

  /* 覆盖 next 组件的样式 */
  .next-btn {
    font-size: 18px;
  }
}
```

该方式会覆盖应用中所有 `Button` 组件的 `font-size` 属性。

### 如何覆盖局部基础组件样式

如果只是想覆盖某个页面/模块里的组件样式，则推荐采用局部覆盖的方式：

```css title="./pages/Home/index.module.css"
.home {
  padding: 10px;
}

.home :global {
  /* 仅修改 .home 下的 button 样式 */
  .next-btn {
    font-size: 24px;
  }
}
```

如果组件本身支持 `style` 属性，也可通过 `style` 属性修改：

```tsx title="./pages/Home/index.tsx"
export default function () {
  return (
    <>
      <Button style={{ fontSize: '16px' }}>OK</Button>
    </>
  );
}
```

### 如何获得 CSS 嵌套的类型提示

可以在 VSCode 编辑器中需要安装 [PostCSS Language Support 插件](https://marketplace.visualstudio.com/items?itemName=csstools.postcss) 以支持嵌套写法。
