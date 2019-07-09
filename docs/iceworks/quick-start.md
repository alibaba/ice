---
title: 快速开始
order: 2
---

## 安装工具

```bash
$ npm install iceworks -g
$ iceworks
```

## 启动 iceworks

安装完成后，只需要在命令行执行以下命令，即可在浏览器启动本地化 Web 版本：

```bash
$ iceworks # open http://localhost:4444/
```

## 创建项目

如果是第一次使用 iceworks 工作台，可以基于推荐的模板开始快速创建项目，也可以从物料市场选择模板进行此创建项目，这里我们选择基于推荐模板开始创建：

* 新建一个文件夹或者选择已有的空文件夹（避免覆盖原有文件）。
* 给项目起一个项目名，以便后续识别。

![创建项目](https://img.alicdn.com/tfs/TB1fF45dWSs3KVjSZPiXXcsiVXa-2878-1572.png)


## 项目管理

项目创建完成后，会自动添加到项目列表中，并打开当前```项目管理```面板，可以看到如下界面：

![项目管理](https://img.alicdn.com/tfs/TB1uKtYd8OD3KVjSZFFXXcn9pXa-2877-1572.png)


## 工程管理

在```工程管理```界面，我们可以启动调试服务，并且可以自定义调试配置参数：

![工程管理](https://img.alicdn.com/tfs/TB1HpB1d8Kw3KVjSZFOXXarDVXa-2880-1584.png)


## 预览界面

点击启动调试服务完成后会自动当打开当前项目的预览界面：

![预览界面](https://img.alicdn.com/tfs/TB1p6lCceSSBuNjy0FlXXbBpVXa-2562-1590.png)

## 进入开发调试

在 iceworks 底部，我们提供了一些快捷操作，可以快速打开编辑器，文件夹等操作；目前支持 Visual Studio Code，Sublime Text 3，WebStorm 和 Atom 等编辑器，推荐使用 Visual Studio Code，如果你的电脑中未安装请先安装。打开编辑器我们可以看到目录结果如下：

```
├── mock/                        # 本地模拟数据
│   ├── index.js
├── public/                      # 静态文件，build时直接输出到根目录
│   ├── index.html               # HTML文件
│   └── favicon.png              # Favicon
├── src/
│   ├── components/              # 自定义业务组件
│     ├── NotFound/              # NotFound 组件
│     │   ├── index.jsx          
│     │   └── index.module.scss  
│   ├── layouts/                 # 布局组件
│   ├── pages/                   # 业务页面
│     ├── Home/                  # Home 页面
│     │   ├── components/        # 页面级自定义业务组件
│     │   ├── index.jsx          # 入口文件
│     │   └── index.module.scss  # css module样式
│   ├── config/                  # 配置信息
│   │   ├── dataSource.js        # 数据源配置
│   │   ├── routes.js            # 路由配置
│   │   └── menu.js              # 导航菜单配置
│   ├── stores/                  # 全局状态管理
│   ├── locales/                 # 国际化资源
│   ├── utils/                   # 工具库
│   │   └── request.js           # 通用的数据源请求方法
│   ├── global.scss              # 全局样式
│   ├── router.jsx               # 路由渲染组件，依赖 config/routes.js
│   └── index.jsx                # 入口脚本
├── tests/                       # 测试工具
├── ice.config.js                # 项目配置，包含插件配置及自定义webpack配置等
├── jsconfig.json
├── README.md
└── package.json
```

## 打包发布

点击工程面板的构建项目的 ```运行``` 按钮，将开发的构建出最终的 js css 等资源。

构建完成后，会在项目目录下生成 `build` 文件夹，里面存在了 `index.html`、 `index.js`、 `index.css` 文件。使用你熟悉的方式，上传到对应的 cdn 服务器。
