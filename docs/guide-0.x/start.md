---
title: 使用 iceworks 创建&开发项目
order: 2
---

飞冰（ICE）提供了 iceworks 这个研发工具，支持项目&物料开发。针对项目开发，可以选择原始的 CLI，也可以选择功能更加丰富的 IDE。

## 使用 IDE 

[iceworks](/iceworks) 定位为企业级中后台领域 IDE，我们希望通过 iceworks 提供前端项目创建、开发、调试及发布的全链路一体化开发流程。

> 参考[安装 iceworks 章节](/docs/iceworks/setup)进行安装。

### 1. 创建项目

![创建项目](https://img.alicdn.com/tfs/TB1oOcps9f2gK0jSZFPXXXsopXa-2000-1600.gif)

1. 点击 **+** 号按钮；
2. 选择模板；
3. 填写项目信息；
4. 点击**进入工作台**按钮。

### 2. 启动调试

![启动调试](https://img.alicdn.com/tfs/TB18dsss1L2gK0jSZFmXXc7iXXa-960-600.gif)

1. 在**我的项目**中点击项目卡片中的**编辑**按钮进入工作台；
2. 点击导航栏上的**启动**按钮，首次启动将自动安装依赖，启动成功将在浏览器打开调试页面；
3. 打开资源管理器内 `src/page/**/*.jsx` 文件，光标定位到需要插入物料的位置；
3. 点击右侧活动栏的**展开**按钮打开**物料面板**，**点击物料**插入到光标位置。

### 3. 初始化仓库

![初始化仓库](https://img.alicdn.com/tfs/TB1gR7Ss4n1gK0jSZKPXXXvUXXa-960-600.gif)

1. 点击左侧活动栏上的**源代码管理**按钮，在左侧边栏将打开源代码管理面板；
2. 点击**初始化仓库**，选择当前项目名初始化一个 Git 仓库；
3. 暂存所有更改，输入提交信息并提交；
4. 拷贝远程仓库 URL；
5. 通过 `⇧⌘P` 唤起命令面板，输入 **Git: 添加远程库**；
6. 输入远程库名称和 URL；
7. 点击源代码管理面板右上角的 `...` 查看更多操作，点击**发布分支**将分支发布到远程仓库。

### 4. 发布

> 仅适用于阿里内部，需要手动在 DEF 研发平台[创建应用](https://work.def.alibaba-inc.com/apply/new)，关联上一步初始化的仓库。

![发布](https://img.alicdn.com/tfs/TB1X9SKtoH1gK0jSZSyXXXtlpXa-960-600.gif)

1. 在导航栏上的左侧点击**请登录**；
2. 在源代码管理面板将本地代码改动提交到远程仓库；
3. 在导航栏上的右侧点击**发布**。

## 使用 CLI 

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
