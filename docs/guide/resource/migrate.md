---
title: icekit pro 模板升级指南
order: 4
---

飞冰将前端开发领域的最佳实践集成在 icekit pro 模板中，pro 模板到目前为止发过 3 个版本，每个版本之间的 breaking change 主要在于路由配置方面，以下列出了不同版本间的差异点：

## 版本差异点

### icekit 1.x
- 路由配置放在 `src/routerConfig` 中
- 路由配置中只包含页面路由配置，不支持路由按 Layout 分组，所有路由平铺

```javascript
const routerConfig = [
  {
    path: '/dashboard/monitor',
    component: Dashboard,
  },
  {
    path: '/chart/general',
    component: Charts,
  }
];
```

- Layout 路由在 `src/router.js` 中

```javascript
// 按照 Layout 分组路由
const router = () => {
  return (
    <Switch>
      <Route path="/user" component={UserLayout} />
      <Route path="/" component={BasicLayout} />
    </Switch>
  );
};

```

- 重定向路由与未匹配路由定义在 Layout 组件中，例如 BasicLayout 的路由为 `src/layouts/BasicLayout/MainRoutes.js`

```javascript
  <Switch>
    {/* 渲染权限路由表 */}

    {routerData.map(this.renderAuthorizedRoute)}

    {/* 路由重定向，嵌套路由默认重定向到当前菜单的第一个路由 */}
    {redirectData.map((item, index) => {
      return <Redirect key={index} exact from={item.from} to={item.to} />;
    })}

    {/* 首页默认重定向到 /dashboard */}
    <Redirect exact from="/" to="/dashboard/monitor" />

    {/* 未匹配到的路由重定向到 404 */}
    <Route component={NotFound} />
  </Switch>
```

### icekit 2.x
- 相对于 1.x 对路由配置作了收敛，将 Layout 配置及重定向、未匹配路由全部收敛到 `src/routerConfig.js` 中

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

- 路由渲染逻辑全部收敛到 `src/router.jsx` 中

### icekit 3.x
- 与 2.x 唯一的区别是 `routerConfig` 与 `menuConfig`, `dataSourceConfig` 进一步收敛到 `config` 目录中，目录结构如下：

```markdown
└── config/                    # 配置信息
    ├── dataSource.js          # 数据源配置
    ├── routes.js              # 路由配置
    └── menu.js                # 导航菜单配置
```


## 升级指南

官网上的文档都是基于最新的 3.x 版本目录规范，如果您的项目是基于旧版本的 icekit，请按照以下步骤升级到 3.x 版本：

### 1.x 升级 3.x
1. 按照 3.x 目录规范将数据源配置、路由配置、导航菜单配置移入 `src/config/` 目录下
2. 按照路由设计文档中的[路由配置](/docs/guide/dev/router#路由配置)部分，升级 `src/config/routes.js` 中的路由配置
3. 按照路由设计文档中[路由生成](/docs/guide/dev/router#具体使用)部分，升级路由渲染逻辑文件 `src/router.jsx`，并将 `src/index.jsx` 中路由调用改成如下方式：

	```javascript
	...
	import router from './router';
	...
	
	ReactDOM.render(
	  <LanguageProvider locale={locale}>
	    {router()}
	  </LanguageProvider>,
	  ICE_CONTAINER
	);
	```

4. 将 Layout 中路由配置部分 `<MainRoutes>` 删除，并替换成 `children`

	```javascript
	// 修改前
	<Layout>
	  <Header />
	  <Layout.Section>
	    <Layout.Main>
	      <MainRoutes />  
	    </Layout.Main>
	  </Layout.Section>
	  <Footer />
	</Layout>
	
	// 修改后
	<Layout>
	  <Header />
	  <Layout.Section>
	    <Layout.Main>
	      {this.props.children}
	    </Layout.Main>
	  </Layout.Section>
	  <Footer />
	</Layout>
	
	```

5. 将 `src/menuConfig.js` 移入 `config` 目录下，路径为 `src/config/menu.js`

### 2.x 升级 3.x

由于 2.x 与 3.x 的唯一区别在于 `config` 目录，因此只需要将 `routerConfig` 与 `menuConfig`, `dataSourceConfig` 移入 `config` 目录中，目录结构如下：

```markdown
└── config/                    # 配置信息
    ├── dataSource.js          # 数据源配置
    ├── routes.js              # 路由配置
    └── menu.js                # 导航菜单配置
```



