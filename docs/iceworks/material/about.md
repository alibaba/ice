---
title: 物料管理
order: 1
---

物料即组成一个前端项目的不同单位，在 iceworks 物料体系中，我们将物料从小到大依次抽象为：组件 -> 区块 -> 项目模版三种类型。

基于这样的理念，ICE 在社区的参与下建立起了海量的官方物料和第三方物料，在物料管理面板，我们可以方便的查看和使用这些物料，也可以将自己开发的物料添加到 iceworks 使用。

## 使用物料

选择我们想要使用的物料体系，右侧面板会根据物料源地址自动加载这套物料包含的物料信息。

### 模版

模版即包含多个页面的完整前端项目模版，点击使用该模版，填写以下项目信息即可生成前端项目：

- 路径：该项目的保存路径；
- 目录名：自定义项目目录名。

![使用模版](https://img.alicdn.com/tfs/TB1od2_eQ9E3KVjSZFGXXc19XXa-2791-1534.png)

填写完成后，将跳转回项目管理面板。

### 区块

区块即包含一个或多个组件、功能相对比较简单的更大型的组件或页面。在物料面板仅支持预览效果及查看源码，不支持直接使用区块，如需使用区块，请在**项目管理**中使用。

### 组件

组件即原子化的基础组件或面向业务的业务组件，点击安装后，iceworks 会将该组件添加到项目的 `package.json` 依赖中并执行 npm install，安装完成后，开发者只需在需要使用该组件的 `jsx` 文件中引入组件依赖即可。

## 自定义物料

### 添加物料

iceworks 默认自带了由 ICE 团队提供的海量高质量物料。当官方物料无法满足开发需求时，开发者也可以选择第三方的物料添加到 iceworks 中使用。

点击添加物料后在弹框中数据物料信息即可添加物料，我们需要填写以下信息：

- 物料名称：自定义物料的名称，如 antd 物料、vue 物料 等；
- 物料源地址：获取物料数据的 URL，可以是一个 GET 接口，也可以是一个 JSON 文件的 URL 地址，不可重复，如：https://ice.alicdn.com/assets/vue-materials.json。

![添加物料](https://img.alicdn.com/tfs/TB1VY.ybwFY.1VjSZFqXXadbXXa-2790-1532.png)

### 开发物料

在实际开发中，很多业务都需要建立自有的物料体系，如定制模版、业务组件等，因此，ICE 团队通过 [ice-devtools](https://ice.work/docs/materials/about) 为开发者提供了便携的自定义物料开发链路。大体研发流程如下：

1. 使用 ice-devtools 初始化物料仓库；
2. 在本地开发业务组件、区块、定制模版等物料；
3. 将以上物料发布到 npm；
4. 使用 ice-devtools 生成物料数据；
5. 使用 ice-devtools 发布物料数据并生成物料源地址，可选择 unpkg 或 [fusion](https://fusion.design/)（仅限 react 物料）；
6. 在 iceworks 中添加以上物料源使用。

更多有关物料开发的技术信息，请参考 [《ice-devtools 文档》](https://ice.work/docs/materials/about)。

## 推荐物料

### 官方 Vue 物料

飞冰官方维护的 Vue 物料（模板/区块/组件），基于 Vue 2.x, Element, Vue CLI。使用 Vue 的用户可自行添加该物料。

- 物料源地址：https://ice.alicdn.com/assets/vue-materials.json
- 物料源码：https://github.com/ice-lab/vue-materials
- 物料预览：https://ice.work/scaffold?type=vue
