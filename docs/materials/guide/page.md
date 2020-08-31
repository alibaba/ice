---
title: 页面开发
order: 4
---

## 开发

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

页面项目的目录结构：
> 查看[页面示例](https://github.com/ice-lab/iceworks-cli/tree/master/examples/material-page)

```bash
.
├── blocks
├── package.json
└── pages
    └── example
        ├── .tmp
        ├── config
        │   ├── mock.js                   模拟配置
        │   └── settings.json             用于生成表单的配置
        ├── src                           模板源码
        │   └── index.tsx.ejs
        ├── build.json
        └── package.json
```

- `src`: 页面的主要代码在 `src/`，src 顾名思义，是页面源码目录，所有源码在这个目录下完成。
- `config`: 页面模板变量的设置在 `config/`，config 文件夹存放页面模板可配置项，最终用于生成供业务开发者使用的配置化表单：

  - setings.json

      你需要将页面模板中的所有出现过的模板变量制作一份 基于 JSON schema 的说明放入此文件中，这些说明将转化为可视化表格，以供物料使用者进行配置。
      > 什么是 [JSON Schema](http://json-schema.org/)?
      >
      > JSON Schema 示例:
      >
      > ```json
      >{
      >  "schema": {
      >    "title": "用户任务列表",
      >    "description": "显示用户信息和用户持有的任务",
      >    "type": "object",
      >    "required": [
      >      "isShowUser"
      >    ],
      >    "properties": {
      >      "isShowUser": {
      >        "type": "boolean",
      >        "title": "是否显示用户信息",
      >        "default": "Chuck"
      >      },
      >		...
      >    }
      >  }
      > ```

      你也可以在这里配置用于生成表单的模式，可选择 [formily](https://github.com/alibaba/formily) 或自定义表单，默认为 [formily](https://github.com/alibaba/formily)。
  - mock.js

      schema 的对应的的模拟数据，可用于开发调试。
- `.tmp`: 调试时生成的临时文件位于 `.tmp` 文件夹下。

## 调试

### 调试模板

你需要 `build-plugin-block` 插件来对模板进行调试，下载这个插件并将其配置到 `build.json` 文件中。如果你使用了 `iceworks-cli` 脚手架, 那么脚手架已经帮你完成了相关的配置，如果你的 `build.json` 文件并非是通过 `iceworks-cli` 生成，请添加如下代码：

```json
{
  "plugins": [
    [
      ...
      "build-plugin-block",
      {
        "usingTemplate": true,
        "materialType": "page"
      }
    ]
}
```

之后，你需要进入页面物料所在的文件夹，运行项目启动指令启动调试功能。

```
cd pages/ExamplePage
npm install // run this command only in first time
npm start
```

在调试期间，当你修改 `src/` 下的所有物料源文件或 `config/mock.js` 模拟数据均会触发热加载，你将获得由当前模拟数据生成的实时页面。

### 调试 settting.json

`config/setting.json` 文件是沟通物料模板开发者与使用者的桥梁，物料使用者通过基于 `setting.json` 生成的 [Fromily](https://github.com/alibaba/formily) 表单进行创建页面配置。

我们默认使用了 `fusion design` 主题，这意味着你不需要配置 `JSON Schema` 中关于表单样式的字段即可生成配置界面。如果你需要定制样式，请添加这些字段以生成高度定制化的表单。

> [如何配置 Formily 表单的 JSON Schema ？](https://formilyjs.org/#/0yTeT0/jAU8UVSYI8)
>
> [fusion design 为默认主题提供了那些组件？](https://formilyjs.org/#/zoi8i0/MAUJU4SyFj)
>
> [如何控制表单生成定制化布局？](https://formilyjs.org/#/0yTeT0/rpi9iZS5sY)

如果你想要模拟用户配置页面模板，你需要先将页面物料物料托管到云端，之后在 [Iceworks](https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks) 中设置 `自定义物料源` 为你发布的物料源。

配置后，你需要在 VS Code 中打开一个当前页面物料可以适配的项目（例如： ICE ），通过 `Ctrl+Shift+P` 或 `⇧⌘P` 唤起 vscode 命令行，输入 `iceworks: 创建页面` 唤起创建页面功能面板。在选定你发布的物料源后可以看到需要调试的页面物料，你可以在这个面板中模拟用户配置过程。

> [如何发布物料？](https://ice.work/docs/materials/get_start)
>
> [如何配置自定义物料源？](https://ice.work/docs/materials/guide/usage)

如果配置正确，你将看到类似下图的界面：

![使用示例](https://user-images.githubusercontent.com/56879942/91725804-d0ae5680-ebd1-11ea-9716-d7273e816280.png)

## 发布

每个物料开发完成后，都需要先发布到 npm 才能使用，我们在当前路径执行 `npm publish` 发布 Homepage 页面：

```bash
npm publish
```

执行 publish 命令的时会自动执行 `npm run build` 和 `npm run screenshot`。build 命令完成页面的构建任务，而 screenshot 命令作用是生成页面截图，截图被用于 iceworks 展示。当然，你也可以手动截图图片作为截图，只需要截图以 `screenshot.png` 保存在当前目录即可。
