---
title: 使用 iceworks 创建&开发项目
order: 2
---

飞冰（ICE）提供了 iceworks 这个研发工具，支持项目&物料开发，同时针对项目开发，可以选择原始的 CLI 方式，也可以选择功能更加丰富的 GUI 方式。

## 使用 GUI 方式创建项目

[iceworks](/iceworks) 定位为基于物料的一站式可视化源码研发工作台，我们希望通过 iceworks 屏蔽前端工程环境的复杂度，让开发者可以零配置的开始一个项目。

### 1. 安装工具

```bash
$ npm install iceworks -g
# 查看版本
$ iceworks -V
```

### 2. 启动 iceworks

安装完成后，只需要在命令行执行以下命令，即可在浏览器启动本地化 Web 版本：

```bash
$ iceworks # open http://localhost:8000/
```

### 3. 创建项目

如果是第一次使用 iceworks 工作台，可以基于推荐的模板开始快速创建项目，也可以从物料市场选择模板进行此创建项目，这里我们选择基于推荐模板开始创建：

* 新建一个文件夹或者选择已有的空文件夹（避免覆盖原有文件）;
* 给项目起一个项目名，以便后续识别。

![创建项目](https://img.alicdn.com/tfs/TB1YmsodF67gK0jSZPfXXahhFXa-2878-1586.png)

### 4. 项目管理

项目创建完成后，会自动添加到项目列表中，并打开当前`项目管理`面板，可以看到如下界面：

![项目管理](https://img.alicdn.com/tfs/TB1uKtYd8OD3KVjSZFFXXcn9pXa-2877-1572.png)

### 5. 工程管理

在`工程管理`界面，我们可以启动调试服务，并且可以自定义调试服务的配置参数：

![工程管理](https://img.alicdn.com/tfs/TB1HpB1d8Kw3KVjSZFOXXarDVXa-2880-1584.png)

### 6. 预览界面

点击启动调试服务完成后会自动当打开当前项目的预览界面：

![预览界面](https://img.alicdn.com/tfs/TB1p6lCceSSBuNjy0FlXXbBpVXa-2562-1590.png)

### 7. 编辑代码

在 iceworks 底部，我们提供了一些快捷操作，可以快速打开编辑器，文件夹等操作；目前支持 Visual Studio Code，Sublime Text 和 Atom 等编辑器。

### 8. 项目构建

点击工程面板的构建项目的 `运行` 按钮，将开发的构建出最终的 js css 等资源。

构建完成后，会在项目目录下生成 `build` 文件夹，里面存在了 `index.html`、 `index.js`、 `index.css` 文件。


## 使用 CLI 方式创建项目

### 1. 安装 CLI 工具

```bash
$ npm i -g iceworks
$ iceworks --help
```

### 2. 初始化项目

```bash
$ mkdir ice-project
$ cd ice-project
$ iceworks init
# 或者通过自定义模板创建项目
$ iceworks init project @vue-materials/admin-lite
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

### 4. 项目构建

```bash
# 启动调试服务
$ npm run build
```

执行完成后会在 `build` 目录下生成 `js/index.js` 和 `css/index.css` 文件，只需要在对应 HTML 中引入这两个文件即可渲染出页面。
