---
title: 物料开发
order: 2
---

物料仓库初始化时会自动生成一些示例的物料，同时可以通过命令新增物料：

```bash
$ iceworks add
```

选择你想开发的物料并填写相关信息，完成后 iceworks 会初始化好物料的基础代码。

## 区块开发

我们以区块开发为例：

![](https://img.alicdn.com/tfs/TB14nyLcwKG3KVjSZFLXXaMvXXa-1470-960.png)

在这里，我们需要填写：

- block name：区块名称（命名规范为大驼峰式）
- title：可随意填写，用于填充示例代码
- version：版本号，默认 1.0.0
- description：区块描述
- category：选择分类，用于快速索引

完成后，在 `blocks/` 目录下生成了新的区块目录。

根据提示进入区块文件夹，安装依赖并开始开发：

```bash
$ cd blocks/ProfileCard
$ npm install
$ npm start
```

区块的主要代码在 `src/`，src 顾名思义，是区块源码目录，所有源码在这个目录下完成。

每个物料开发完成后，都需要先发布到 npm 才能使用，我们在当前路径执行 `npm publish` 发布 ProfileCard 区块：

```bash
npm publish
```

执行 publish 命令的时会自动执行 `npm run build` 和 `npm run screenshot`。build 命令完成区块的构建任务，而 screenshot 命令作用是生成区块截图，截图被用于 iceworks 展示。当然，你也可以手动截图图片作为截图，只需要截图以 `screenshot.png` 保存在当前目录即可。

## 组件开发

组件的开发流程和区块相似，在完成组件的初始化后，在 `components/` 目录下生成了新的组件目录。

```
├── demo                  # 组件 demo
│      └── usage.md
├── src                   # 组件源码
│      ├── main.scss
│      └── index.js
├── lib/                  # 构建生成，编译为 ES5 的代码，一般情况无需关心
├── build/                # 构建生成，用于组件文档/demo 预览，一般情况无需关心
├── README.md
└── package.json
```

整体开发流程与区块基本一致。

## 项目开发

项目初始化将会生成项目开发所需的基础代码骨架，整体流程和区块没有太多区别。
