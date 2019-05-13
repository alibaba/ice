---
title: 自定义初始化模板
order: 10
---

ice-scripts生成的初始化项目可以满足大部分用户的需求，如果还有定制的需求，比如初始化的项目需要包含较多定制逻辑、特殊的区块或组件需求。那么可以通过自己开发模版的npm包方式支持，参考[ice-react-material-template](https://github.com/alibaba/ice/tree/master/templates/ice-react-material-template)的目录结构实现自己的模版，并将其发布为npm包。

## 初始化模版

```bash
$ ice init scaffold --template @icedesign/ice-react-material-template
```

## 初始化区块

```bash
# 初始化默认区块模版
$ ice init block

# 初始化指定区块模版
$ ice init block --template @icedesign/ice-react-material-template
```

## 初始化组件

```bash
# 初始化默认组件模版
$ ice init component

# 初始化指定组件模版
$ ice init component --template @icedesign/ice-react-material-template
```

附：关于自定义模版开发，我们推荐通过一个项目/仓库开发当前业务的所有物料，因为这样更便于管理和持续维护。如果需要单独开发一个业务组件/区块，可以参考[文档](https://www.yuque.com/ice-team/wiki/mmgkb5)