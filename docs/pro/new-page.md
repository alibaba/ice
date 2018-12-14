---
title: 新增页面
order: 5
category: ICE Design Pro
---

在常见的中后台应用中，菜单和路由是整个应用的关键所在，前面我们分析了模板中的菜单设计和路由设计，这里结合 Iceworks 来进行实际操作，如何在项目中新增页面。来进行实际操作，如何在项目中新增页面。

打开 Iceworks，在模板界面任意选择一个模板进行初始化，这里我们选择 Ice Design Pro 为例，点击使用该模板进行初始化

![](https://img.alicdn.com/tfs/TB1mjm1CuSSBuNjy0FlXXbBpVXa-954-684.png)

初始化完成后按照提示进行依赖安装，在 Iceworks 项目面板点击 启动调试服务 进行预览，成功后在浏览器访问看到如下界面说明项目初始化成功
![](https://img.alicdn.com/tfs/TB16UYoCv5TBuNjSspmXXaDRVXa-3813-1947.png)

接下来，我们点击 新建页面 来新增一个页面到我们的项目，先进行区块选择
!p[(https://img.alicdn.com/tfs/TB143ArCv1TBuNjy0FjXXajyXXa-1066-788.png)

选择完成后，可以点击 预览页面 和 生成页面，这里我们点击生成页面操作，可以看到如下界面，支持输入以下信息：

- 页面目录名
- 路由路径
- 页面导航名

![](https://img.alicdn.com/tfs/TB1_WqVCrGYBuNjy0FoXXciBFXa-1066-788.png)

在完成以以上步骤后，回到我们的浏览器发现对应的菜单栏出现了新增的导航信息，说明一切正常。

![](https://img.alicdn.com/tfs/TB1QRo2CqmWBuNjy1XaXXXCbXXa-1910-976.png)

最后，我们在来看看生成的代码

- 路由代码

```
// src/routerConfig.js
const routerConfig = [
 ...
  {
    path: '/home',
    layout: HeaderAsideFooterLayout,
    component: Home,
  },
 ...
]
```

- 菜单代码

```
const asideMenuConfig = [
  ...
  {
    name: '首页',
    path: '/home',
    icon: 'home',
  },
  ...
]
```

- 组件代码

对应的页面组件代码默认会下载在 `src/pages/` 下面：

```
import React, { Component } from 'react';
import OverviewBoard from './components/OverviewBoard';
import DataStatistics from './components/DataStatistics';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page">
        <OverviewBoard />
        <DataStatistics />
      </div>
    );
  }
}
```

至此，在了解基本的菜单和路由设计之后，我们就可以很快的利用 Iceworks 进行页面搭建，并进行二次开发。
