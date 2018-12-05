---
title: 路由设计
order: 4
category: ICE Design Pro
---

## 路由配置

在模板中，路由与菜单一样也是按照一定的约定进行配置，用来描述路由的结构关系。路由主要分为 路由配置 和 路由生成 两部分：

- 路由配置：在 `src/routerConfig.js` 中配置路由
- 路由生成：在 `src/router.js` 中生成路由

这样设计的目的主要是分离路由配置信息和路由生成部分，配置和生成进行解耦，有利于在新增路由时只需要关注路由配置，除了顶层路由，其余路由列表都是自动生成，其中关键的就是中心化配置文件 `src/routerConfig.js`，它的主要作用是：

- 配置路由相关信息，可以配置对应路由的路径，渲染组件，权限，布局等字段；
- 根据路由配置生成路由数据，并将路由数据挂载到每条路由对应的组件上；

```js
const routesConfig = [
  {
    path: '/post',
    layout: BasicLayout,
    component: PostList,
    children: [
      {
        path: 'list', // 路径
        layout: BasicLayout, // 布局
        component: PostList, // 组件
        authority: 'user', // 权限
      },
      {
        path: 'create',
        layout: BasicLayout,
        component: CreatePost,
        authority: 'admin',
      },
    ],
  },
];
```

## 路由生成

### 基础知识

模板中使用的是 React Router v4 版本，相较于 React Router 前面三个版本发生了较大的改变，在写法以及 API 上也完全不同；我们来对比一下 v3 和 v4 的写法：

在 v3 之前的版本，通常的做法是将路由规则集中化在一个位置进行配置，使他们与布局以及组件进行分离。当然，你也可以将路由划分成多个文件进行管理，但本质上都是以路由单元进行文件配置化，看一个简单的示例，包含首页和用户页面的路由配置：

```js
// 代码来源：https://css-tricks.com/react-router-4/
import { Router, Route, IndexRoute } from 'react-router';

const PrimaryLayout = (props) => (
  <div className="primary-layout">
    <header>Our React Router 3 App</header>
    <main>{props.children}</main>
  </div>
);

const HomePage = () => <div>Home Page</div>;
const UsersPage = () => <div>Users Page</div>;

const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={PrimaryLayout}>
      {' '}
      // Layout 配置
      <IndexRoute component={HomePage} /> // 首页
      <Route path="/users" component={UsersPage} /> // 用户页面
    </Route>
  </Router>
);

render(<App />, document.getElementById('root'));
```

而在 v4 中不再提倡中心化的路由管理，推荐路由规则位于布局和 UI 组件本身。对比上面 v3 的路由，以下是在 v4 中的实现：

```js
// 代码来源：https://css-tricks.com/react-router-4/
import { BrowserRouter, Route } from 'react-router-dom';

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>Our React Router 4 App</header>
    <main>
      <Route path="/" exact component={HomePage} /> // 路由配置在这里
      <Route path="/users" component={UsersPage} />
    </main>
  </div>
);

const HomePage = () => <div>Home Page</div>;
const UsersPage = () => <div>Users Page</div>;

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
);

render(<App />, document.getElementById('root'));
```

对比上面的两种实现，我们可以看到，在 v4 中路由处于 `PrimaryLayout` 之中，并不是通过 `props.children` 来嵌套组件渲染，而是 `<Route>` 组件分布式的在各个组件自身，如果路由匹配，则子组件就在对应的位置渲染。

如果你还不太了解，可以先看看下面几篇推荐的文章：

- [react-router 官网](https://github.com/ReactTraining/react-router)
- [Migrating from v2/v3 to v4](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/migrating.md)
- [[译]关于 React Router 4 的一切](https://github.com/xitu/gold-miner/blob/master/TODO/all-about-react-router-4.md)
- [React Router v4 几乎误我一生](https://zhuanlan.zhihu.com/p/27433116)

### 具体使用

接下来具体看看在模板中我们是如何来实现的；基于路由配置，可以发现每个对应的路由都可以配置一个单独的布局，可以是相同的也可以是不相同的布局，在这种情况下，意味着每个路由入口都包含了一个新的布局，实现如下：

- 主路由入口:

```js
import { routerData } from './routerConfig';

const router = () => {
  return (
    <Switch>
      {routerData.map((item, index) => {
        return <Route key={index} path={item.path} component={item.layout} />;
      })}
      <Redirect exact from="/" to="/dashboard" />
    </Switch>
  );
};
```

- 对应的布局中的路由实现

```js
// BasicLayout.jsx
...
<Layout.Main>
  <Switch>
    {routerData.map((item, index) => {
      return item.component ? (
        <Route
          key={index}
          path={item.path}
          component={item.component}
          exact={item.exact}
        />
      ) : null;
    })}
  </Switch>
<Layout.Main>
...
```

这样我们将路由分成了两部分，一部分在主路由入口，主要控制布局的渲染；其次在布局中，通过 `<Route>` 组件渲染当前布局对应的组件。但这样设计有个缺点，因为考虑到每个路由都可以支持不同的布局，实际上会导致在每次进入页面都会重新加载，要解决这个问题，可以通过自定义修改路由来避免。

### 自定义修改路由

在实际项目中，可能你并没有为每个路由创建不同布局的需求，通常来讲可能只会有用户登录布局 (UserLayout) 和完成登录后进入主界面的基础布局(BasicLayout)，如果是这样，我们建议你对路由做一次修改，避免每次进入页面都会重新加载布局的问题，修改方式如下：

- 修改 `routerConfig.js` 的配置如下：

```js
const routerConfig = [
  {
    path: '/',
    component: BasicLayout,  // 主页面布局
  },
  {
    path: '/list/article-list',
    component: List,
  },
  {
    path: '/list/card-list',
    component: CardList,
  }
  {
    path: '/user',
    component: UserLayout,  // 用户登录注册页布局
  },
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/user/register',
    component: UserRegister,
  },
];
```

- 修改 `router.js` 的配置如下：

```js
const router = () => {
  return (
    <Switch>
      <Route path="/user" component={UserLayout} /> // 用户登录注册页布局
      <Route path="/" component={BasicLayout} /> // 主页面布局
    </Switch>
  );
};
```

修改之后的路由配置主要是对路由按照布局进行了分组，然后在布局中渲染对应的路由，而不是为每个路由指定一个布局。通过修改，你也可以很容易的添加其他的布局，如添加一个 NormalLayout 如下：

```jsx
// in routerConfig.js

const routerConfig = [
 ...
 {
    path: '/',
    component: BasicLayout,
 },
 {
    path: '/user',
    component: UserLayout,
  },
  {
    path: '/noraml',
    component: NoramlLayout,
  },
  ...
]

// in router.js
<Switch>
  <Route path="/user" component={UserLayout} />
  <Route path="/noraml" component={UserLayout} />
  <Route path="/" component={BasicLayout} />
</Switch>
```

至此，模板中的路由设计方案基本分析完成，这里可以总结如下：

- 考虑到每个路由都能配置任意不同的布局，在渲染的时候实际上是每个路由都会渲染对应的布局，但即使是同一个布局也会导致重新渲染。
- 如果您的实际项目没有多布局的需求，建议通过自定义修改路由的方式进行处理，避免重复的渲染操作。
