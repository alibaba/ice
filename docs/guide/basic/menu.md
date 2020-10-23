---
title: 菜单配置
order: 4
---

在模板中，菜单按照一定的约定进行配置，用来描述菜单栏的结构关系。以  `BasicLayout`  布局为例，菜单配置文件约定在 `src/layouts/BasicLayout/menuConfig.ts`中。

## 基本配置

菜单配置包含 headerMenuConfig 和 asideMenuConfig 两种形式，headerMenuConfig 用于顶部菜单栏的渲染，asideMenuConfig 用于侧边菜单栏的渲染，这样方便在统一的位置管理应用布局的菜单信息：

```typescript
// 顶部菜单栏配置
export const headerMenuConfig = [
   {
    name: 'Home',                     // 菜单名称
    path: '/',                        // 菜单路径
    icon: 'message'                   // 菜单图标
  },
];
// 侧边菜单栏配置
export const asideMenuConfig = [
  {
    name: 'Dashboard',                // 一级菜单名称
    path: '/',                        // 一级菜单路径
    icon: 'edit',                     // 一级菜单图标
    // 二级菜单配置
    children: [
      {
        name: 'Analysis',             // 二级菜单名称
        path: '/dashboard/analysis',  // 二级菜单路径
      },
      {
        name: 'Monitor',
        path: '/dashboard/monitor',
      },
    ],
  },
  // ...
];
```

## 菜单渲染

完整的菜单渲染逻辑可参考 [src/layouts/BasicLayout/components/PageNav/index.tsx](https://github.com/alibaba-fusion/materials/blob/master/scaffolds/scaffold-lite/src/layouts/BasicLayout/components/PageNav/index.tsx)。

## 菜单权限

首先在 `src/layouts/BasicLayout/menuConfig.ts` 中增加以下的内容：

```diff
export const asideMenuConfig = [
  {
    name: 'Home',
    path: '/',
+   auth: ['guest']
  },
];
```

然后在 `src/layouts/BasicLayout/components/PageNav/index.tsx`中配置以下内容：

```tsx
// 模拟权限数据
// 大多数情况下菜单权限数据是从服务端获取，前端获取到数据后，对权限进行对比来控制菜单权限
const mockAuthData = {
  admin: true,
  guest: false,
};

function getNavMenuItems(menusData, initIndex, auth) {
  return menusData
    .filter(item => {
    let roleAuth = true;
    if (auth && item.auth && item.auth instanceof Array) {
      if (item.auth.length) {
        // 获取当前用户是否有该菜单的权限
        roleAuth = item.auth.some(key => auth[key]);
      }
    }
    return item.name && !item.hideInMenu && roleAuth;
  })
  .map((item, index) => getSubMenuOrItem(item, `${initIndex}-${index}`, auth));
}

function getSubMenuOrItem(item, index, auth) {
  // ...
	const childrenItems = getNavMenuItems(item.children, index, auth);
  // ...
}

const Navigation = () => {
	return (
  	<Nav embeddable activeDirection="right">
      {getNavMenuItems(asideMenuConfig, 0, mockAuthData)}
    </Nav>
  )
}
```

完整的菜单权限实现可参考 [src/layouts/BasicLayout/components/PageNav/index.tsx](https://github.com/alibaba-fusion/materials/blob/master/scaffolds/fusion-design-pro/src/layouts/BasicLayout/components/PageNav/index.tsx)。

