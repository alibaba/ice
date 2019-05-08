---
title: 快速创建开发一个 React 项目
order: 2
---

飞冰（ICE）本身不限定使用 React/Vue 或其他前端框架，只要选择对应的物料源即可。但是相比其他框架，我们在 React 领域有更多的沉淀，因此整个创建及后续的开发流程都会以 React 为例，其他框架相关知识可自行查看对应文档。

## 使用 iceworks 创建项目（GUI）

[iceworks](/iceworks) 是基于 Electron 开发的 GUI 开发工具，我们希望通过 iceworks 屏蔽前端工程环境的复杂度，让开发者可以零配置的开始一个项目。

### 1. 安装 iceworks

iceworks 是基于 Electron 开发的桌面端应用，因此首先需要在 [这里](/iceworks) 下载并安装该应用。

### 2. 创建项目

应用启动后，项目列表为空，可通过的【创建项目】新建一个项目。

![undefined | center](https://img.alicdn.com/tfs/TB1SKFucbGYBuNjy0FoXXciBFXa-1964-1424.png)

界面会跳转到模板市场，目前提供三种模板进行选择，鼠标移动到指定的模板上，点击【以该模板创建项目】进入项目配置页面。

![undefined | center](https://img.alicdn.com/tfs/TB1MKBqcbGYBuNjy0FoXXciBFXa-1964-1424.png)

* 新建一个文件夹或者选择已有的空文件夹（避免覆盖原有文件）。
* 给项目起一个项目名，以便后续识别。

点击【开始创建项目】即可开始创建

> 默认会在创建的时候同时安装项目依赖，时间上会相对久一些，也可取消勾选，后续自行安装

### 3. 启动调试服务

项目创建完成后，会自动添加到项目列表中，并打开当前项目管理面板。通过项目管理面板，可执行 **启动调试服务** **新建页面** **构建项目** 等操作。

![undefined | center](https://img.alicdn.com/tfs/TB1VlrAcntYBeNjy1XdXXXXyVXa-1964-1424.png)

点击 `启动调试服务` 等待完成后出现服务地址，点击可以预览当前项目。

![undefined | center](https://img.alicdn.com/tfs/TB1p6lCceSSBuNjy0FlXXbBpVXa-2562-1590.png)

> 上图是一个模板启动后的预览效果。

### 4. 新建页面

启动调试服务后，可使用新建页面来搭建页面，通过区块的组合完成页面的创建。

点击「新建页面」按钮，接着会进入选择区块页面：

![undefined | center](https://img.alicdn.com/tfs/TB14dBQch9YBuNjy0FfXXXIsVXa-1908-1368.png)

上方列出了当前项目可用的 layout 布局方式，选中任一一个作为新页面的布局。

下方列出了当前可选择的 blocks, 点击即可选择该 block 到已选区块列表中。

右侧为选中 block 组合的缩略图预览。

选择 layout 以及 block 后，点击右下角生成页面，会提示输入页面名，路由名，可以定义需要的名称，

* 页面名：表示生成的文件名称。
* 路由名：表示页面的访问地址，可通过 `http://127.0.0.1:4444/#/xxxx` 访问到对应的路由页面。

示例中，创建了 `page16` 访问后即可看到刚搭建的页面了。

![undefined | center](https://img.alicdn.com/tfs/TB1jfVncbSYBuNjSspiXXXNzpXa-1964-1424.png)

### 5. 编辑代码

点击项目面板上「编辑器」按钮即可使用编辑器修改补充代码（也可单独用编辑器打开），修改代码并保存上述的调试页面即会生效。

## 使用 ice-scripts 创建项目（CLI）

### 1. 安装 ice-scripts

```bash
$ npm i -g ice-scripts
$ ice -V
```

### 2. 初始化项目

```bash
$ mkdir ice-project
$ cd ice-project
$ ice init
# 或者基于指定模板创建项目
$ ice init -t {npmName}
```

执行命令后根据需求选择对应模板即可完成项目的创建

### 3. 项目调试

```bash
# 安装依赖，也可使用 yarn
$ npm install
# 启动调试服务
$ npm run start
```

接着通过代码编辑器编写代码就可以在浏览器中看到效果。
