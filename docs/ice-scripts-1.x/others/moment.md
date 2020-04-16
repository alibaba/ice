---
title: Moment.js 按需加载
order: 1
---

基础组件 `@alifd/next` 里的时间相关组件依赖了 moment，但是为了业务可以优化 moment 的包大小，所以 `@alifd/next` 里将 moment 作为自己的 peerDependencies 而非 dependencies，因此项目使用到时间组件时需要自行引入 moment 依赖：

```bash
$ npm install moment --save
```

moment 里有针对国际化语言的大量代码，如果不做任何处理的话会导致 bundle 变大，因此 ice-scripts 默认对 moment 文案做了按需加载，只有通过 `import 'moment/locale/zh-cn.js'` 才会引入对应文案代码，比如如果想支持中文需要在项目入口文件里引入中文的语言文件：

```
// index.js
import 'moment/locale/zh-cn.js';
```