---
title: 区块开发
order: 3
---

新增区块开发，可以通过 `iceworks` 命令添加：

```bash
$ iceworks add block
```

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
