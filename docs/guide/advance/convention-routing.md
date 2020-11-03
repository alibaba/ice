---
title: 约定式路由
order: 10
---

icejs 推荐使用 **配置式路由** 进行路由管理。但同时也支持 **约定式路由** 方案，当项目中存在 `src/routes.[ts|js]` 文件时，则使用配置式路由，否则使用约定式路由。

> 注意：路由文件格式请与 `src/app.[ts|js]` 保持一致，如应用入口为 `src/app.js`，那么路由文件应该为 `routes.js`，如果文件名格式不一致则会进入到约定式路由的逻辑中。

## 约定式路由

顾名思义，约定式路由会根据项目的目录结构自动生成路由配置，无需开发者手动配置。约定式路由虽然不需要用户手动配置，但因为路由配置本身存在很多规则，因此约定式路由也需要约定一系列的目录结构设计，这本身也有一定的学习成本。

### 基础路由

假设 pages 的目录结构如下：

```markdown
src/pages
└── About
    └── index.tsx
└── Dashboard
    ├── a.tsx
    └── b.tsx
```

那么，框架自动生成的路由配置如下：

```ts
export default [
  {
    path: '/about',
    exact: true,
    component: PageAbout
  },
  {
    path: '/dashboard/a',
    exact: true,
    component: PageDashboardA
  },
  {
    path: '/dashboard/b',
    exact: true,
    component: PageDashboardB
  }
]
```

### 404 路由

如果 `src/pages/404.[jsx|tsx]` 或者 `src/pages/404/index.[jsx|tsx]` 文件存在，则将它作为 404 页面

### index 路由

如果 `src/pages/index.[jsx|tsx]` 文件存在，则会自动映射到 `/` 的路由。

### 嵌套路由

框架约定页面目录下存在名为 `_layout.[jsx|tsx]` 时，会产生一个嵌套路由，当前目录和子目录均为子路由。

假设 pages 的目录结构如下：

```markdown
src/pages
└── About
    ├── _layout.tsx
    ├── a.tsx
    └── b.tsx
└── Dashboard
    └── index.tsx
```

那么，框架自动生成的路由配置如下：

```js
[
  {
    path: '/about',
    exact: false,
    component: LayoutAbout,
    children: [
      {
        path: '/a',
        exact: true,
        component: PageAboutA
      },
      {
        path: '/b',
        exact: true,
        component: PageAboutB
      },
    ],
  },
  {
    path: '/dashboard',
    exact: true,
    component: PageDashboard
  }
]
```

### 动态路由

框架约定定义带参数的动态路由，需要创建对应的以下划线作为前缀的文件或目录。

- 路径中 `$` 作为文件夹或文件名的首个字符，标识一个动态路由，如 `src/pages/app/$uid.tsx` 会生成路由 `/app/:uid`
- 路径中文件夹或文件名的首个和最后一个字符同时为 `$`，标识一个可选的动态路由，如 `src/pages/app/$uid$.tsx` 会生成路由 `/app/:uid?`

假设 pages 的目录结构如下：

```markdown
src/pages
└── repo
    ├── $pid.tsx
    └── index.tsx
└── $uid$.tsx
```

那么，框架自动生成的路由配置如下：

```js
export default [
  {
    path: '/repo/:pid',
    exact: true,
    component: PageRepo$pid
  },
  {
    path: '/repo',
    exact: true,
    component: PageRepo
  },
  {
    path: '/:uid?',
    exact: true,
    component: Page$uid$
  }
]
```

### 全局 Layout

如果 `src/layouts/index.[jsx|tsx]` 文件存在，则将它默认作为全局 layout

## 路由配置

### 运行时配置

[详见](/docs/guide/basic/router#运行时配置)

### 构建配置

在 `build.json` 中，我们也可以自定义一些构建配置：

```json
{
  "router": {
    // ...options
  }
}
```

**options**:

- **configPath**: 仅配置式路由，类型 `string`，默认值 `'src/routes.[t|j]s'`，自定义配置式路由文件的地址
- **caseSensitive**: 仅约定式路由，类型 `boolean`，默认值 `false`， 根据文件名转换为路由时是否大小写敏感
- **ignoreRoutes**: 仅约定式路由，类型 `string[]`，默认值 `[]`，忽略指定路由的生成
- **ignorePaths**: 仅约定式路由，类型 `string[]`，默认值 `['components']`，生成路由时忽略指定目录
