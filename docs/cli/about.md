---
title: 关于 ice-scripts
order: 1
---

[ice-scripts](https://github.com/alibaba/ice/tree/master/tools/ice-scripts) 是飞冰（ICE）React 链路的工程工具，类似 Vue CLI 之于 Vue 的关系。ice-scripts 提供了丰富的功能帮助我们开发 React 项目：

- 完善的命令行工具
- 支持项目/业务组件/区块的开发&构建
- 基于 Fusion 体系的主题配置
- 完善的自定义 webpack 配置
- ……

本文会讲述 ice-scripts 完整的使用指南。

## 安装

```bash
$ npm i -g ice-scripts
$ ice --help
```

当然你也可以将其作为项目级依赖：`npm i --save-dev ice-scripts`