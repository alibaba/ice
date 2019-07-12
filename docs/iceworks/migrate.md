---
title: 迁移到 3.0 版本
order: 3
---

## 3.0 带来了什么

* 更强大的项目管理功能，新增了导航管理、路由管理、Git仓库管理功能
* 国际化工作台，支持一键切换中英文
* 支持主题切换，新增深色主题

## 项目迁移方式

如果旧项目根目录**不存在**`ice.config.js`文件，则在`package.json`中增加如下配置

```json
{
  "iceworks": {
    "adapter": "adapter-react-v0"
  }
}
```

如果旧项目根目录**存在**`ice.config.js`文件，且 `routerConfig.js` 中无路由分组 (所有路由平铺)，类似如下结构

```javascript
const routerConfig = [
  {
    path: '/',
    component: 'pages/Dashboard/index.jsx',
    layout: 'layouts/BasicLayout',
    exact: true	
  }, {
    path: '/dashboard',
    component: 'pages/Dashboard/index.jsx',
    layout: 'layouts/BasicLayout',
  }, {
    component: 'components/NotFound/index.jsx',
    layout: 'layouts/BasicLayout',
  }
];
```

则在`package.json`中增加如下配置

```json
{
  "iceworks": {
    "adapter": "adapter-react-v1"
  }
}
```

如果项目根目录**存在**`ice.config.js`文件，且 `routerConfig.js` 中有路由分组（路由有层级关系），类似如下结构

```javascript
const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
      },
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        component: NotFound,
      },
    ],
  },
];
```

则在`package.json`中增加如下配置

```json
{
  "iceworks": {
    "adapter": "adapter-react-v2"
  }
}
```

*注意：使用iceworks 3.0创建的新项目，adapter版本为`adapter-react-v3`*
