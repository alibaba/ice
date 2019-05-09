---
title: 样式方案
order: 3
---

## CSS Reset  
不同的浏览器都有自己默认的一些样式，如果不重置这些样式，可能会导致同一份前端代码在不同的浏览器上显示不一致。社区有两种处理方式：一种是彻底的 `CSS Reset`，另一种是保留一定样式的 [Normalize.css](https://necolas.github.io/normalize.css/)。  

ice 工程的基础组件库是 [Fusion](https://fusion.design/)， Fusion 做了一套系统的 reset.css，所以在 ice 工程入口文件中，引入此 css 文件即可：  
```
import '@alifd/next/reset.scss';
```

## CSS Modules  
ice 项目模板及区块的开发均采用 SCSS + [CSS Modules](https://github.com/css-modules/css-modules) 规范。CSS Modules 可以有效解决样式冲突等问题，ice-scripts 支持 CSS Modules 能力。  

使用方式如下： 

1. 将样式文件的后缀名改为 `xxx.module.scss`

    ```css
    /* index.module.scss */
    .btn {
      color: green;
    }

    .tips {
      font-size: 12px;
    }
    ```

2. 在 jsx 文件中引入对应的样式文件，并赋值对应的 CSS 类名

    ```js
    // index.jsx
    import styles from './index.module.scss';

    <Button className={styles.btn}>OK</Button>;
    ```