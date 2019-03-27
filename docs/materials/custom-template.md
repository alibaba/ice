---
title: 自定义物料模板
order: 6
---

ice-devtools 内置了 react/vue 两套官方物料模板，如果是 React/Vue 体系的用户可以直接基于这两套模板初始化，初始化完成后可以在 `.template` 里对文件结构、工程配置等做定制，后续执行 `idev add` 时会读取 `.template` 下对应的目录进行初始化。

`.template` 的设计本身可以满足大部分用户的定制需求，如果还有更特殊的需求，可以参考 [ice-react-material-template](https://github.com/alibaba/ice/tree/master/templates/ice-react-material-template) 和 [ice-vue-material-template](https://github.com/alibaba/ice/tree/master/templates/ice-vue-material-template) 实现一套自己的模板并将其发布为 npm，然后在初始化时通过参数控制：

```bash
$ idev init --template @icedesign/ice-vue-material-template
```