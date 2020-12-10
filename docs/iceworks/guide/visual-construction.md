---
title: 可视化搭建
order: 4
---

在 Iceworks 中，支持通过可视化的方式创建页面，搭建和创建组件。

## 通过区块组装页面

通过可视化操作，以区块拼装的方式快速生成页面。

### 激活

激活主要有两种方式：

- 点击 VS Code 编辑器左侧的活动栏中的 Iceworks 图标，并在快速入口视图中点击`使用区块组装页面`
- 通过 `⇧⌘P` 或 `Ctrl+Shift+P` 快捷键唤醒命令面板。在命令面板中输入 `Iceworks: Generate Page By Blocks`，并按下回车以激活插件

### 使用

1. 输入页面名称；
2. 从右侧的区块列表中选择页面需要使用的区块，点击添加到左侧页面预览区；
3. 在左侧页面预览区可通过拖拽排序区块的顺序，或点击右上角的删除图标移除区块；
4. 点击“生成页面”按钮，生成页面代码，页面代码默认将生成到 `src/pages/` 目录下。

![生成页面使用](https://img.alicdn.com/tfs/TB1_ctLSLb2gK0jSZK9XXaEgFXa-1440-900.gif)

## 添加物料至源码

通过可视化的方式一键添加区块或组件到源码中。

### 激活

主要有三种方式：

- 点击 VS Code 编辑器左侧的活动栏中的 Iceworks 图标，并在快速入口视图中点击`打开添加组件面板`
- 在需要添加的物料的源码位置中点击右键，选择 `Iceworks: 添加组件`
- 通过 `⇧⌘P` 或 `Ctrl+Shift+P` 快捷键唤醒命令面板。在命令面板中输入 `Iceworks: Import Material`，并按下回车以激活插件

### 使用

1. 选择需要插入物料的代码位置
2. 搜索组件，点击需要使用的组件，物料代码将自动添加到相应的位置中

![物料面板使用](https://img.alicdn.com/tfs/TB1FyFFSNz1gK0jSZSgXXavwpXa-1440-900.gif)

## 下载物料到本地

通过下载区块物料快速创建组件。

### 激活

主要有两种方式：

- 点击 VS Code 编辑器左侧的活动栏中的 Iceworks 图标，并在组件列表视图中点击`+`图标，并选择`下载区块物料到本地`
- 通过 `⇧⌘P` 或 `Ctrl+Shift+P` 快捷键唤起命令面板。输入 `Iceworks: Download Component Materials`，并按下回车以激活插件

### 使用

1. 填写组件名；
2. 组件名输入框下方选择一个使用的区块；
3. 点击 `创建组件` 按钮，生成组件代码，组件代码默认将生成到 `src/components/` 目录下

![下载物料使用](https://img.alicdn.com/tfs/TB1LUFUSQT2gK0jSZFkXXcIQFXa-1440-900.gif)

## 可视化搭建组件

通过可视化搭建的方式生成组件代码。

### 激活

通过 `⇧⌘P` 或 `Ctrl+Shift+P` 快捷键唤起命令面板，输入 `Iceworks: Design Component`，并按下回车以激活插件

### 使用

1. 拖拽左侧的组件到中间的画布面板中；
2. 按下 `⌘S` 或 `Ctrl+S`，在输入框中填写组件名，按下回车键即可生成组件到项目 `src/components/` 目录中。

![搭建组件使用](https://img.alicdn.com/tfs/TB17h0GSQL0gK0jSZFtXXXQCXXa-1440-900.gif)
