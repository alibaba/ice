---
title: 组件模版规范
order: 4
---

```bash
component
  ├── demo                       // 【必选】组件文档，用于生成组件开发预览，以及生成组件文档
  │   └── basic.md
  ├── lib                            // 【必选】组件编译后的文件
  │   ├── index.js              // 【必选】src/index.js 编译生成
  │   ├── style.js               // 【必选】自动生成，引入 main.scss 以及依赖组件的 style.js
  │   ├── main.scss           // 【必选】src/main.scss 编译生成
  │   └── index.scss          // 【必选】自动生成，包含组件自身样式，以及依赖组件样式，正常情况下不需要
  ├── src                          // 【必选】组件源码
  │   ├── index.js              // 【必选】组件出口文件
  │   └── main.scss          // 【必选】仅包含组件自身样式的源码文件
  ├── README.md             // 【必选】组件说明及API
  └── package.json            // 【必选】
```

