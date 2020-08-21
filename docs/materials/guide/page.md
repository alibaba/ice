---
title: 页面开发
order: 4
---

新增页面开发，可以通过 `iceworks` 命令添加：

```bash
$ iceworks add page
```

![](https://user-images.githubusercontent.com/56879942/90782290-6f64c880-e331-11ea-9f9a-46099e11a7b9.png)

在这里，我们需要填写：

- page name：页面名称（命名规范为大驼峰式）
- title：可随意填写，用于填充示例代码
- version：版本号，默认 1.0.0
- description：页面描述
- category：选择分类，用于快速索引

完成后，在 `pages/` 目录下生成了新的页面目录。

根据提示进入页面文件夹，安装依赖并开始开发：

```bash
$ cd pages/Homepage
$ npm install
$ npm start
```

页面的主要代码在 `src/`，src 顾名思义，是页面源码目录，所有源码在这个目录下完成。

注意，与区块物料不同的是，页面物料的开发中允许使用 ejs 模板。因此，有些页面会以 `*.tsx.ejs` 类型的文件出现。这些页面模板中通常含有模板变量，你需要在 `config/mock.js` 中对这些变量进行模拟配置，之后在调试页面中会显示由这些模拟数据生成的页面。在开发完成后，需要将页面模板中的所有出现过的模板变量制作一份 基于 json schema 的说明放入 `config/setting.json` 中。这些说明将转化为可视化表格，以供物料使用者进行配置。

每个物料开发完成后，都需要先发布到 npm 才能使用，我们在当前路径执行 `npm publish` 发布 Homepage 页面：

```bash
npm publish
```

执行 publish 命令的时会自动执行 `npm run build` 和 `npm run screenshot`。build 命令完成页面的构建任务，而 screenshot 命令作用是生成页面截图，截图被用于 iceworks 展示。当然，你也可以手动截图图片作为截图，只需要截图以 `screenshot.png` 保存在当前目录即可。
