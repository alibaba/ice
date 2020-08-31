---
title: 模板（脚手架）开发
order: 5
---

推荐直接使用飞冰官方提供的模板，如果官方模板不能满足团队诉求，可以通过开发自定义的模板（即项目脚手架）。

通过 `iceworks` 命令添加模板：

```bash
$ iceworks add scaffold
```

完成后，在 `scaffolds/` 目录下会生成脚手架文件结构。

根据提示进入文件夹，安装依赖并开始开发：

```bash
$ cd scaffolds/SimpleScaffold
$ npm install
$ npm start
```

每个物料开发完成后，都需要先发布到 npm 才能使用，我们在当前路径执行 `npm publish` 发布 SimpleScaffold 脚手架：

```bash
$ npm publish
```

执行 publish 命令的时会自动执行 `npm run build` 和 `npm run screenshot`。build 命令完成区块的构建任务，而 screenshot 命令作用是生成脚手架截图，截图被用于 iceworks 展示。当然，你也可以手动截图图片作为截图，只需要截图以 `screenshot.png` 保存在当前目录即可。
