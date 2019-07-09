---
title: 菜单管理
order: 5
---

在 iceworks 中 **菜单管理面板** 指的是对项目侧边栏和头部菜单的可视化管理。通过可视化的管理配置，可以快速地创建、修改和删除菜单。

菜单管理主要包括 **侧边栏菜单** 和 **头部菜单** 两部分，面板里通过 Tab 可以切换「查看」或者「编辑」两个菜单数据，其背后的原理是修改文件 `src/config/menu.js` 里的 `asideMenuConfig` 和 `headerMenuConfig` 变量，具体的协议和规范可以参考[文档](https://ice.work/docs/guide/dev/nav)。

## 侧边栏导航

![查看侧边栏导航](https://img.alicdn.com/tfs/TB1Ydfoe8WD3KVjSZKPXXap7FXa-444-340.png)

如上图所示，侧边栏导航以树级结构展示，你可以通过拖拽改变导航节点的顺序或者结构，在 **菜单面板** 的右上角有「刷新」和「新建」两个图标，点击刷新，你可以同步最新的导航数据，点击新建会弹出创建菜单的对话框，如下图：

![创建菜单](https://img.alicdn.com/tfs/TB175Dve8Cw3KVjSZFuXXcAOpXa-805-395.png)

这里创建的是头部菜单还是侧边栏菜单是面板当前 Tab 决定的。侧边栏菜单的字段如下：

* 类型：总共有菜单组、普通菜单和外链三种类型，普通菜单和外链可以放入到菜单组中
* 名称：菜单名称，最终会显示在页面上
* 路径：菜单路径，普通菜单以 `/` 开头，外链需要填写全链接(如 https://ice.work)
* 图标：菜单图标，跟名称一样也会显示在页面上，需要从 `https://ice.work/component/foundationsymbol` 中选择
* 是否打开新窗口：只有外链需要，选择了以后点击链接在浏览器会打开新的窗口

创建完的菜单会显示在树级根节点的最后一个，在树级菜单的右侧有「编辑」和「删除」两个操作，如下图所示，在编辑面板中无法修改当前的菜单类型，字段跟创建的字段保持一致。

![编辑菜单](https://img.alicdn.com/tfs/TB1fpjoe.WF3KVjSZPhXXXclXXa-657-376.png)

## 头部菜单

切换 Tab 可以看到头部菜单列表，和侧边栏菜单略有不同，头部菜单没有 **菜单组** 的概念，所以这里显示的也只有一级，不会有树级结构，其它操作类似：

![头部菜单](https://img.alicdn.com/tfs/TB1VxYse9WD3KVjSZSgXXcCxVXa-454-340.png)
