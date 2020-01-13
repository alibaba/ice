---
title: 搭建物料
order: 3
---

目前搭建链路支持直接搭建区块，如需使用，请在**工作台**中使用。

## 新增区块

打开 **物料市场**，选择 **本地物料**，点击 **新增区块**，开始搭建，点击 **保存**。

![新增区块](https://img.alicdn.com/tfs/TB11WtwteT2gK0jSZFvXXXnFXXa-640-400.gif)

### 组件的使用

组件分为两大类，文件类型容器组件和非文件类型组件。

#### 文件类型容器组件

文件类型组件有 Block、Component 两种，对应源码体系中的 React Class 文件，支持：

- state 状态管理
- 生命周期 hook 方法
- 自定义方法
- 异步数据源
- scss 容器内样式

#### 非文件类型组件

非文件类型组件，比如 Div、Table、Form 等，不可配置 异步数据源 和 组件样式 scss/less，支持：

- 内联样式 style
- 组件属性
- 组件自带事件、html 原生事件
- 设置循环数据

Form
![Form](https://img.alicdn.com/tfs/TB12y4zthz1gK0jSZSgXXavwpXa-2412-1282.jpg)

Table
![Table](https://img.alicdn.com/tfs/TB1mjNDtbY1gK0jSZTEXXXDQVXa-2418-1278.jpg)

### 搭建样式配置

支持组件内联样式 style 属性可视化配置，拥有可视化配置和代码配置两种配置方式。

#### 可视化配置

可视化方式控制当前选中组件自身的样式，将布局、文字、定位、背景、边框五类样式枚举并可视化表现出来，适合不同角色用户使用。

![可视化配置](https://img.alicdn.com/tfs/TB1eN8ytXY7gK0jSZKzXXaikpXa-594-1378.png)

#### 代码配置

源码方式控制当前选中组件自身的样式，当可视化方式无法满足样式配置需求时，可点击样式面板的右上角切换至源码方式，编写内联样式对象 style。

![代码配置](https://img.alicdn.com/tfs/TB14NXCti_1gK0jSZFqXXcpaXXa-1500-1817.png)


