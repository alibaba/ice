---
title: 菜单设计
order: 3
category: ICE Design Pro
---

在模板中，菜单按照一定的约定进行配置，用来描述菜单栏的结构关系。菜单信息配置在 src/menuConfig.js 中，这样设计的目的主要有以下几点：

- 菜单配置包含 headerMenuConfig 和 asideMenuConfig 两种形式，headerMenuConfig 用于顶部导航的渲染，asideMenuConfig 用于侧边栏导航的渲染，这样方便在统一的位置管理应用的导航信息
- 如果需要对某些菜单进行权限控制，只需在对应的菜单配置项设置 authority 属性即可，代表该菜单的准入权限，详见 权限管理
- 约定后的菜单数据结构本质上是一份固定的数据协议，在 Iceworks 新增页面时，也会按照约定的格式写入菜单信息。

```
const headerMenuConfig = [
  ...
  {
    name: '反馈',                            // 导航名称
    path: 'https://github.com/alibaba/ice', // 导航路径
    external: true,                         // 是否外链
    newWindow: true,                        // 是否新开窗口
    icon: 'message',                        // 导航图标
  },
];

const asideMenuConfig = [
  {
    name: '文章管理',    // 一级导航名称
    path: '/post',     // 一级导航路径
    icon: 'edit',      // 一级导航图标
    authority: ''      // 一级导航权限配置
    children: [
      {
        name: '文章列表',     // 二级导航名称
        path: '/post/list'  // 二级导航路径
        authority: 'admin'  // 二级导航权限配置
      },
      {
        name: '添加文章',
        path: '/post/create'
        authority: 'admin'
      },
    ],
  }
];

export { headerMenuConfig, asideMenuConfig };
```
