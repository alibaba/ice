---
title: 菜单配置
order: 4
---

## 基本配置

以  `BasicLayout`  布局为例，菜单配置文件约定在 `src/layouts/BasicLayout/menuConfig.ts`中，具体配置如下：

```typescript
// 顶部菜单栏配置
export const headerMenuConfig = [];
// 侧边菜单栏配置
export const asideMenuConfig = [
  {
    name: 'Home',
    path: '/',
  },
  // 子菜单配置
  {
    name: 'Dashboard',
    path: '/',
    children: [
      {
        name: 'Analysis',
        path: '/dashboard/analysis',
      },
      {
        name: 'Monitor',
        path: '/dashboard/monitor',
      },
    ],
  },
];
```

菜单配置完成后，可以在 `src/layouts/BasicLayout/components/PageNav/index.tsx`中使用：

```tsx
import { Nav } from '@alifd/next';
import { asideMenuConfig } from '../../menuConfig';

function getNavMenuItems(menusData, index) {
	// ...
}

const Navigation = () => {
	return (
  	<Nav embeddable activeDirection="right">
      {getNavMenuItems(asideMenuConfig, 0)}
    </Nav>
  )
}
```

完整的菜单实现可参考 [src/layouts/BasicLayout/components/PageNav/index.tsx](https://github.com/alibaba-fusion/materials/blob/master/scaffolds/scaffold-lite/src/layouts/BasicLayout/components/PageNav/index.tsx)

## 菜单权限

首先在 `src/layouts/BasicLayout/menuConfig.ts` 中增加以下的内容：

```diff
// src/layouts/BasicLayout/menuConfig.js
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

完整的菜单实现可参考 [src/layouts/BasicLayout/components/PageNav/index.tsx](https://github.com/alibaba-fusion/materials/blob/master/scaffolds/fusion-design-pro/src/layouts/BasicLayout/components/PageNav/index.tsx) 

