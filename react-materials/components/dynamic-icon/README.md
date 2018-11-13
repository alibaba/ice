---
title: DynamicIcon
category: BizComponents
chinese: 自定义 Iconfont 图标组件
npm: dynamic-icon
---

DynamicIcon 组件，相比 Icon，可以从 [http://iconfont.cn](iconfont.cn) 自定义图标集，同时内置了一些扩展的图标集合。

#### 自定义 iconfont.cn 项目使用

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DynamicIcon from 'dynamic-icon';

// 使用 custom 生成自定义 ICON 组件
const CustomIcon = DynamicIcon.create({
  fontFamily: 'iconfont',
  prefix: 'icon',
  css: 'https://at.alicdn.com/t/font_1472628097_7496383.css'
});

class App extends Component {
  state = {};

  render() {
    return <CustomIcon type="dingding" />;
  }
}

ReactDOM.render(<App />, mountNode);
```

#### custom 方法参数说明

* fontFamily：[http://iconfont.cn](iconfont.cn) 项目的 font-family，详见项目配置
* prefix：[http://iconfont.cn](iconfont.cn) 项目中的 Symbol 前缀，详见项目配置
* css：[http://iconfont.cn](iconfont.cn) 项目生成的在线 CSS CDN 地址

#### 自定义类型 type 说明

![](https://gw.alicdn.com/tfs/TB1bf21XHSYBuNjSspiXXXNzpXa-1304-810.png)

CustomIcon 组件的 type 值其实是 iconfont.cn 每一个图标的 symbol 名称，获取方法是在 iconfont.cn 后台选择`复制代码`，如结果是 `icon-dianpu`，同时配置的 `prefix` 为 `icon` ，此图标的 type 类型即为 `dianpu`

**注意：**如果您在同一个项目中引入多个 iconfont.cn 的项目，请确保项目的 `font-family` 及 `symbol prefix` 都不相同，以避免全局命名的冲突。

#### QA

Q 如何从 [http://iconfont.cn](iconfont.cn) 获取项目信息？

A 进入 iconfont.cn 的项目列表，选择 `Font class` 可以获取项目的(1)在线 CDN 地址

选择(2)更多操作 - 项目信息可以查看和修改项目的 `font-family` 及 `symbol prefix`

![](https://gw.alicdn.com/tfs/TB1bTf2XMmTBuNjy1XbXXaMrVXa-2002-1330.png)
