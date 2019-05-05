---
title: 自定义物料模板
order: 5
---

ice-devtools 内置了 React/Vue 两套官方物料模板，如果是 React/Vue 体系的用户可以直接基于这两套模板初始化，初始化完成后可以在 .template 里对文件结构、工程配置等做定制，后续执行 idev add 时会读取 `.template` 下对应的目录进行初始化。

.template 的设计本身可以满足大部分用户的定制需求，如果还有更特殊的使用场景比如：用 ice-devtools 开发单个组件，并且组件目录有较多定制逻辑。那么可以通过自己开发模板 npm 包的方式来支持，参考 [ice-react-material-template](https://github.com/alibaba/ice/tree/master/templates/ice-react-material-template) 和 [ice-vue-material-template](https://github.com/alibaba/ice/tree/master/templates/ice-vue-material-template) 的目录结构实现自己的模板并将其发布为 npm 包，然后在初始化时通过参数控制：

```bash
$ idev init --template @icedesign/ice-vue-material-template
```

附：关于物料开发，我们推荐通过一个项目/仓库开发当前业务的所有物料，因为这样更便于管理和持续维护。如果需要单独开发一个业务组件/区块，可以参考[文档](https://www.yuque.com/ice-team/wiki/mmgkb5)