---
title: 对 package.json 的定制
order: 5
---

## materialConfig

在物料的 `package.json` 中，包含一个 `materialConfig` 字段描述当前物料的一些配置：

- type `{string}`：指定当前物料的前端框架类型 eg: 'react', 'vue', 'angular'，**请勿随意更改**
- logo `{string}`：配置物料的品牌 logo
- template `{string}`：记录当前物料初始化时的物料模版，当新建物料时，将依赖这个值获取物料模版，**请勿随意更改**

## componentConfig

在组件的 `package.json` 中，包含一个 `componentConfig` 字段描述当前组件的属性：

- name `{string}`：组件名称（英文）
- title `{string}`：组件名称（任意文本）
- category `{string}`：组件的分类

## blockConfig

在区块的 `package.json` 中，包含一个 `blockConfig` 字段描述当前区块的属性：

- name `{string}`：区块名称（英文）
- title `{string}`：区块名称（任意文本）
- category `{string}`：区块的分类

## scaffoldConfig

在项目的 `package.json` 中，包含一个 `scaffoldConfig` 字段描述当前项目的属性：

- builder `{string}`：项目的构建工具
- name `{string}`：项目名称（英文）
- title `{string}`：项目名称（任意文本）
- category `{string}`：项目的分类
- type `{string}`：指定当前项目的前端框架类型 eg: 'react', 'vue', 'angular'，根据物料仓库的 `package.json` 自动生成
