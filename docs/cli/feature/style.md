---
title: 使用样式
order: 5
---

ice-scripts 默认支持 CSS/Less/Sass/CSS Modules 的样式能力。

## 使用 CSS

样式文件后缀名为 `.css`，在对应的 JS 文件中引入：

```css
/* index.css */
.btn {
  color: green;
}
```

```js
import './index.css';

<Button className="btn">OK</Button>
```

## 使用 Less

[Less](http://lesscss.org/) 是对 CSS 语言的增强，允许使用变量（variables）、混合（mixins），函数（functions）和许多能力，让 CSS 更具维护性和扩展性。后缀为 `.less` 样式文件，即会自动启用 Less 编译能力：

```css
/* index.less */
@color: red;

.btn {
  color: @color;
}
```

```js
import './index.less';

<Button className="btn">OK</Button>
```

## 使用 Sass

[Sass](https://sass-lang.com/) 与 Less 类似，同样也是对 CSS 语言的增强，允许使用变量、嵌套规则、mixins、导入等功能，并兼容 CSS 语法。文件后缀名为 `.scss`，即会启用 Sass 编译能力：

```css
/* index.scss */
$color: red;

.btn {
  color: $color;
}
```

```js
import './index.scss';

<Button className="btn">OK</Button>
```

## CSS Modules

[CSS Modules](https://github.com/css-modules/css-modules) 可以有效解决样式的冲突等问题。只需要将样式文件的后缀名改为 `.module.[css/scss/less]`，即可使用 CSS Modules 的能力：

```css
/* index.module.scss */
.btn {
  color: green;
}

.tips {
  font-size: 12px;
}
```

```js
// index.js
import styles from './index.module.scss';

<Button className={styles.btn}>OK</Button>;
```

在这些众多方案里，我们推荐使用 CSS Modules 方案，具体参见 [样式方案](/docs/guide/dev/style.md)。