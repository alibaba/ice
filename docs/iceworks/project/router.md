---
title: 路由管理
order: 2
---

**路由管理** 面板指的是对项目所有路由的可视化管理，通过可视化的管理配置，可以快速地创建、修改和删除路由；路由面板修改的文件是 `src/config/routes.js`，具体的协议讨论过程可参考[#2031](https://github.com/alibaba/ice/issues/2031)。

## 路由功能

路由功能面板主要是对 react-router 通过数据约定进行可视化的配置能力，其本质上是对路由功能的一种抽象，约定数据格式之后通过渲染逻辑生成对应的路由，提供了如下四种路由类型：

### 普通路由

普通的页面路由，填写路径和组件，组件从页面列表中选择：

![普通路由](https://img.alicdn.com/tfs/TB1tRHabrr1gK0jSZFDXXb9yVXa-2114-632.png)

### 空路由（404）

只填写组件，表示该路由为空路由，在浏览器访问任何不存在的路由会显示路由下的组件：

![空路由](https://img.alicdn.com/tfs/TB1kD5_bp67gK0jSZPfXXahhFXa-2114-632.png)

### 重定向路由

只填写路径和重定向路径，如果填了组件不会生效。在浏览器访问对应路径会跳转到重定向路径：

![重定向路由](https://img.alicdn.com/tfs/TB1dIoDaKbviK0jSZFNXXaApXXa-2114-632.png)

### 路由组

多个路由可以在同一个路由组内共用一个布局，路由组的组件即代表被共用的布局；路由组必须有路径和组件，组件从布局列表中选择；路由组下可以有其他路由，但不能再有路由组：

![路由组](https://img.alicdn.com/tfs/TB1wSi.bq67gK0jSZFHXXa9jVXa-2114-632.png)


## 创建路由

点击面板右上角的 “+” icon 弹出如上图所示的创建路由面板，具体字段说明：

- 路径：路由路径，假设一个网站的域名是 `https://ice.work`, 改路径填写了 `/page1`，那么就可以在浏览器上访问 `https://ice.work/#/page1`，如果没填路径，改路由类型是「空路由」；
- 是否路由分组：选“是”则表示该路由为「路由组」；
- 组件：创建路由组时，该组件列表就是布局列表，如果未选，该组件列表是页面列表；
- 重定向：如果路径为`/page1`，填了重定向路径 `/page2`，用户在浏览器访问 `https://ice.work/#/page1` 时，将会跳转到 `https://ice.work/#/page2`；
- 是否精确匹配：这是 react-router 的概念，可参考[文档](https://reacttraining.com/react-router/web/api/Route/exact-bool)。

![创建路由](https://img.alicdn.com/tfs/TB1g0vbbAT2gK0jSZFkXXcIQFXa-2873-1566.png)

## 路由操作

在路由列表中，针对所有的路由你可以点击「编辑」和「删除」进行操作，针对路由组类型可以点击「创建」在该路由组中新增路由。
