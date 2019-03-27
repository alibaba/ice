---
title: 开发区块
order: 3
---

## 添加区块

```bash
$ cd my-materials
$ idev add block
```

根据提示输入对应的区块信息，添加完成后会在  `my-materials/blocks/`  目录下新增一个区块，进入到该目录下，运行以下命令进行开发，假设初始化的区块为 `Login` :

```bash
$ cd blocks/Login

# 启动服务
$ npm start
```

## 开发区块

```
.
├── README.md
├── demo
│   ├── index.html
│   └── index.js
├── package.json
└── src
    ├── index.js
    └── index.module.css
```

其中 src 对应区块的源代码，在项目中添加区块时也是将这部分代码添加到项目里，demo 是为了调试预览区块，一般不需要改动。

## 发布区块

开发完成后，按照 npm 的命令将模板发布到 npm。
