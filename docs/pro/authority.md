---
title: 权限管理
order: 8
category: ICE Design Pro
---

在前后端分离设计中，权限管理是中后台应用中经常会涉及的一个话题，在分析模板中的权限管理之前，我们先来梳理下常见的权限管理指的是什么。

在理解权限控制之前，需要明白两个概念：资源和权限。什么是资源，对于一个系统来说，系统内部的所有信息都可以理解为这个系统的资源。页面是资源、数据是资源、按钮是资源、图片是资源。而权限就是访问某个资源所需要的标识。无论系统的权限如何设计，在用户登录时，都可以计算得出用户所拥有的权限标识集合，也就确定了该用户能访问哪些系统资源，权限控制的本质是控制登录用户对于系统资源的访问，可以细分为一下几种方式：

- 登录授权，用户没有登录只能访问登录页面，如果处于登录状态则跳转到当前用户的默认首页；
- 路由授权，当前登录用户的角色，如果对一个 URL 没有权限访问，则跳转到 403 页面；
- 数据授权，当访问一个没有权限的 API，则跳转到 403 页面；
- 操作授权，当页面中某个按钮或者区域没有权限访问则在页面中隐藏

## 实际应用

在前后端分离设计中，通常的做法是由服务端提供权限数据接口，前端根据接口数据做对应的路由拦截控制和页面数据的渲染。在模板中，我们使用 [Authorized](https://pro.ant.design/components/Authorized-cn/) 权限组件实现了基本的权限管理方案，你可以基于模板结合实际的业务进行开发，模板中主要包含菜单权限控制和路由权限控制。

### 菜单权限

如需对某些菜单进行权限控制，只须对菜单配置文件 menuConfig  中的菜单项设置 authority 属性即可，代表该项菜单的准入权限，菜单生成文件中会默认调用 Authorized.check 进行判断处理。

```
const menuConfig = [
 ...
 {
    name: '表格页',
    path: '/table',
    icon: 'table',
    // authority: 'admin',  // 权限配置，如果子菜单没有配置，则子菜单继承这里的权限
    children: [
      {
        name: '基础表格',
        path: '/table/basic-table',
        authority: 'admin',  // 优先级大于父级菜单
      },
      {
        name: '常用竖向表格',
        path: '/table/table-display',
        authority: 'user',
      }
 }
 ...
]
```

### 路由权限（AuthorizedRoute）

在模板中提供了 AuthorizedRoute 权限组件，实现思路是通过传入准入权限和当前用户的权限进行对比过滤掉没有权限的路由。可以在路由配置中配置权限，但菜单中配置的权限会自动同步到对应路由中，如果 routerConfig.js 中有不同的配置，路由控制以 routerConfig.js 的配置为准。

```
const routerConfig = [
  ...
  {
    path: '/dashboard',
    component: Dashboard,
    layout: BasicLayout,
    authority: 'admin',
  },
  {
    path: '/table/basic-table',
    component: BasicTable,
    layout: BasicLayout,
    authority: 'user',
  }
  ...
]
```

模板权限默认是配置在菜单中的，如果是需要从服务端获取权限数据，则可以在 BasicLayout 中获取数据，将服务端返回的数据和配置项进行合并处理即可，渲染逻辑是通用的。
