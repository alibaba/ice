---
title: 快速上手
order: 3
---

ICE 企业级泛后台应用解决方案，提供程序员更快、更优、更 Cool 的开发体验。

**零环境搭建** **零配置** **简单易用**

## 1. 下载 iceworks

目前公测阶段只支持 macOS 系统，通过 [Iceworks](https://alibaba.github.io/ice/#/iceworks) 点击下载即可。

## 2. 启动 iceworks

软件启动后，项目目录为空，通过上方的【创建项目】新建一个项目。

![undefined | center](https://img.alicdn.com/tfs/TB14o5YlsjI8KJjSsppXXXbyVXa-1648-1128.png)

## 3. 选择或新建目录并输入项目信息

点击 创建项目 后，来到创建项目的流程，默认选择 ICE Design 风格的脚手架，公测阶段暂只提供此选择。进入下一步创建目录：

![undefined | center](https://img.alicdn.com/tfs/TB1hJMUi5qAXuNjy1XdXXaYcVXa-1648-1128.png)

* 新建一个文件夹或者选择已有的空文件夹（避免覆盖原有文件）。
* 给项目起一个项目名，以便后续识别。

点击创建项目即可完成创建。

## 4. 项目管理

当项目创建完成后，会自动添加到项目列表中，未来开发的项目都会在列表中展示。通过项目管理面板，可执行 **构建** **启动调试** **新建页面** 等操作。

![undefined | center](https://img.alicdn.com/tfs/TB1o0rOksLJ8KJjy0FnXXcFDpXa-1424-1184.png)

### 启动调试服务

点击 `启动调试服务` 等待完成后出现服务地址，点击可以预览当前项目。

![undefined | center](https://img.alicdn.com/tfs/TB1tsaHksrI8KJjy0FhXXbfnpXa-2586-1398.png)

初始化的项目默认没有页面，只有基础的框架，接下来可以通过 新建页面 来丰富我们的项目。

## 5. 新建页面

启动调试服务后，可使用新建页面来搭建页面，通过 [block](https://alibaba.github.io/ice/#/template/block) 的组合完成页面的创建。

![undefined | center](https://img.alicdn.com/tfs/TB1uiuIkC_I8KJjy0FoXXaFnVXa-1424-1184.png)

进入 block 搭建页面

![undefined | center](https://img.alicdn.com/tfs/TB1boqPlsrI8KJjy0FhXXbfnpXa-1704-1184.png)

上方列出了当前项目可用的 layout 布局方式，选中任一一个作为新页面的布局。

左侧列出了当前选择的 blocks, 点击即可选择该 block 搭建页面。右侧为选中 block 组合的缩略图预览。

选择 layout 以及 block 后，点击右下角生成页面，会提示输入页面名，路由名，可以定义需要的名称，

* 页面名：表示生成的文件名称。
* 路由名：表示页面的访问地址，可通过 `http://127.0.0.1:4444/#/xxxx` 访问到对应的路由页面。

示例中，创建了 `page2` 访问后即可看到刚搭建的页面了。

![undefined | center](https://img.alicdn.com/tfs/TB15mjklv6H8KJjy0FjXXaXepXa-1704-1184.png)

## 6. 进入开发调试

点击项目版面上的 `编辑中打开` 会立即使用设置中选择的编辑器打开项目，目前支持 [Visual Stadio Code](https://code.visualstudio.com/) 和 [Sublime Text](https://www.sublimetext.com/) 两个编辑器，推荐使用 [Visual Stadio Code](https://code.visualstudio.com/)，如果你的电脑中未安装请先安装。

项目目录结构说明：

```
project-name
├── dist                                    // 打包资源
├── mock                                    // 模拟数据
├── public                                  // 静态资源
├── src
│   ├── components                          // 公共组件
│   ├── config                              // 公共配置
│   ├── layouts                             // 通用布局
│   ├── pages                               // 页面
│   ├── utils                               // 通用方法
│   ├── global.scss                         // 全局样式
│   ├── index.html                          // 入口模板
│   ├── index.js                            // 应用入口
│   └── routes.jsx                          // 路由入口
├── tests                                   // 测试
├── .editorconfig                           // 代码风格配置
├── .eslintignore                           // eslint 忽略目录配置
├── .eslintrc                               // eslint 配置
├── generator.json                          // generator.json
├── package.json                            // package.json
├── README.md                               // 项目说明
└── yarn.lock                               // 模板版本管理
```

例如上一步已创建的 `Page3` 页面：

![undefined | center](https://img.alicdn.com/tfs/TB1E912kwvD8KJjy0FlXXagBFXa-1810-1126.png)

通过二次开发增加业务逻辑，完成业务需求。

## 7. 打包发布

点击项目面板上的构建项目按钮，将开发的构建出最终的 js css 等资源。

构建完成后，会在项目目录下生成 `dist` 文件夹，里面存在了 `index.js` `index.css` 文件。使用你熟悉的方式，上传到对应的 cdn 服务器。

![undefined | center](https://img.alicdn.com/tfs/TB1hCjMlx6I8KJjy0FgXXXXzVXa-1082-814.png)

## 8. 部署 html

index.html 文件存在在 public 中，将 index.html 文件复制到对应的服务服务器，并修改 html 源码中的 `/dist/index.css` 和 `/dest/index.js` 地址，是上一步中得到的 cdn 地址。

以及站点标题。

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <link rel="stylesheet" type="text/css" href="{cdn路径}/dist/index.css">
  <title>{站点标题}</title>
</head>

<body>
  <div id="ice_container"></div>
  <script src="https://g.alicdn.com/code/npm/??react/16.2.0/umd/react.development.js,react-dom/16.2.0/umd/react-dom.development.js"></script>
  <script type="text/javascript" charset="utf-8" src="{cdn路径}/dist/index.js" id="ice-script"></script>
</body>

</html>
```

到这里你已经学会使用 Iceworks 创建一个项目并发布：）
