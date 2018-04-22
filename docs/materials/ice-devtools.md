---
title: 开发者工具
order: 2
category: 物料
---

## 开发者工具 ice-devtools

在实际项目中，官方提供的物料源和设计风格可能不能满足某些业务场景，基于此我们提供了开发者工具 ice-devtools 来满足自定义物料体系的能力，支持自定义接入 React 或者是 Vue 的区块、布局、模板等功能。

### 安装 ice-devtools

```
$ npm i ice-devtools -g
```

### 使用 ice-devtools init 进行初始化

```
$ ice-devtools init ice-materials-template app
? 选择初始类型
❯ ◯ React
  ◯ Vue
? 项目名称
? 项目描述
```

在初始化时可以选择是 React 或者是 Vue 类型的物料，支持多选，也就是在同一个仓库下同时包含 React 和 Vue 类型的物料。

这里以多选为例，同时选择 React 和 Vue，初始化完成后会自动生成如下目录结构，可以看到生成的目录里包含了 react-materials 和 vue-materils 两个目录， 且目录下面分别对应 `blocks`、`layouts`、`scaffolds` 三个文件夹，即上一章节介绍的物料类型。

```
ice-materials-template
├── react-materials  // react 物料
│   ├── blocks
│   ├── layouts
│   └── scaffolds
├── vue-materials    // vue 物料
│   ├── blocks
│   ├── layouts
│   └── scaffolds
├── .editorconfig
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .prettierignore
├── .prettierrc
├── LICENSE
├── README.md
├── lerna.json
└── package.json
```

### 启动本地服务

初始化完成后，可以通过 `ice-devtools` 启动本地服务，默认包含区块，布局，模板展示案例

```
$ ice-devtools start
```

**预览界面**
![ice-materials-preview](https://img.alicdn.com/tfs/TB17haCnKuSBuNjy1XcXXcYjFXa-2858-1586.png)

至此，按照上面的步骤，我们已经初始化了一个物料仓库，接下来，你可以按照实际的业务场景进行自定义物料。
