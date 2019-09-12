---
title: 菜单管理
order: 7
---

在模板中，菜单按照一定的约定进行配置，用来描述菜单栏的结构关系。菜单信息配置在 `src/config/menu.js` 中，这样设计的目的主要有以下几点：

- 如果需要对某些菜单进行权限控制，只需在对应的菜单配置项设置 authorities 属性即可，代表该菜单的准入权限，详见[权限管理](/docs/guide/dev/authority.md)章节。
- 约定后的菜单数据结构本质上是一份固定的数据协议，在 iceworks 新增页面时，也会按照约定的格式写入菜单信息。

## 菜单配置协议

菜单配置包含 headerMenuConfig 和 asideMenuConfig 两种形式，headerMenuConfig 用于顶部导航的渲染，asideMenuConfig 用于侧边栏导航的渲染，这样方便在统一的位置管理应用的导航信息：

```js
// src/config/menu.js
const headerMenuConfig = [
  // ...
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
    children: [
      {
        name: '文章列表',     // 二级导航名称
        path: '/post/list'  // 二级导航路径
      },
      {
        name: '添加文章',
        path: '/post/create'
      },
    ],
  }
];

export { headerMenuConfig, asideMenuConfig };
```

## 菜单渲染

在 `layouts/BasicLayout/components/Aside/index.jsx` 里可以看到渲染菜单的具体逻辑。

## 菜单图标

我们默认使用 [FoundationSymbol](/component/foundationsymbol) 这个组件渲染图标，可以使用哪些图标可以在组件文档中看到，如果有其他自定义的图标需求，将代码改为对应图标组件即可。

```jsx
<SubNav
  key={index}
  icon={item.icon ? <FoundationSymbol type={item.icon} size="small" /> : null}
  label={
    <span className="ice-menu-collapse-hide">
      <FormattedMessage id={getLocaleKey(item)} />
    </span>
  }
>
  {childrenItems}
</SubNav>
```
