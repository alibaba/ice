---
title: 搭建物料
order: 3
---

目前搭建链路支持直接搭建区块，如需使用，请在**编辑器**中使用

## 新增区块

**物料面板** -> **本地物料** -> **新增区块** -> **开始搭建** -> **保存**

![新增区块](https://img.alicdn.com/tfs/TB11WtwteT2gK0jSZFvXXXnFXXa-640-400.gif)

### 搭建组件使用

组件分为两大类，文件类型容器组件 和 非文件类型组件。

#### 文件类型容器组件

文件类型组件有Block、Component两种，对应源码体系中的React Class文件，支持：

- state状态管理
- 生命周期hook方法
- 自定义方法
- 异步数据源
- scss容器内样式

#### 非文件类型组件

非文件类型组件，比如Div、Table、Form等，不可配置 异步数据源 和 组件样式scss/less，支持配置

- 内联样式style
- 组件属性、
- 组件自带事件、html原生事件
- 设置循环数据

Form
![Form](https://img.alicdn.com/tfs/TB12y4zthz1gK0jSZSgXXavwpXa-2412-1282.jpg)

Table
![Table](https://img.alicdn.com/tfs/TB1mjNDtbY1gK0jSZTEXXXDQVXa-2418-1278.jpg)

### 搭建样式配置

支持组件内联样式style属性可视化配置，拥有 可视化配置 和 代码配置 两种配置方式。

#### 可视化配置

可视化方式控制当前选中组件自身的样式，将布局、文字、定位、背景、边框五类样式枚举并可视化表现出来，适合不同角色用户使用。

![可视化配置](https://img.alicdn.com/tfs/TB1eN8ytXY7gK0jSZKzXXaikpXa-594-1378.png)

#### 代码配置

源码方式控制当前选中组件自身的样式，当可视化方式无法满足样式配置需求时，可点击样式面板的右上角切换至源码方式，编写内联样式对象style。

![代码配置](https://img.alicdn.com/tfs/TB14NXCti_1gK0jSZFqXXcpaXXa-1500-1817.png)


