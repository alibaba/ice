---
title: 开发独立业务组件
order: 4
---

在某些特殊情况下，我们可能只想开发一个独立的业务组件，而非完整的物料集合，这种情况下，可使用 `ice-devtools` 开发基于指定物料模版的独立业务组件。

## 初始化

```bash
# 新建组件文件夹
$ mkdir my-component & cd my-component

# 初始化
$ idev init --type component
```

根据提示选择物料模版及输入组件信息，ice-devtools 会生成初始化代码。

## 开发

进入当前组件目录，开发过程与单个物料开发是类似的。执行以下命令启动 dev server：

```bash
$ npm install

$ npm start
```

## 发布

发布组件的流程实际上也就是发布一个 npm 包的过程。

```bash
# 在组件根目录下
$ npm publish
```
