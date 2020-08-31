---
title: 使用物料
order: 8
---

物料数据托管同步之后，都会获得唯一的 URL 地址，此时只需将物料源地址配置到 Iceworks 中即可使用。

打开 VS Code，确定你已经安装了 [Iceworks 插件集合](https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks)，然后在 VS Code 中输入命令 Iceworks: Set 唤起设置面板：

![](https://img.alicdn.com/tfs/TB1mnuDXCslXu8jSZFuXXXg7FXa-1082-685.png)

点击「添加」按钮：

![](https://img.alicdn.com/tfs/TB1GosubCR26e4jSZFEXXbwuXXa-1039-743.png)

接着就可以在 Iceworks 里通过物料新建项目、拼装页面了。关于 Iceworks 更详细的使用，请查看 [Iceworks 文档](https://ice.work/docs/iceworks/about)。

Iceworks 生成的物料数据是一份不包含物料源码的元数据，当用户在 Iceworks 中添加物料 URL 后，Iceworks 会向该 URL 请求物料数据，根据物料数据在页面中展示当前物料集合包含的组件、区块和项目。当用户选择使用物料时，Iceworks 再通过 npm 下载源码。