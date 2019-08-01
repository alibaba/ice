---
title: AppLink
order: 7
---

子应用之间跳转，替代 React Router 的 `Link` 组件，表示本次跳转需要重新加载静态资源；子应用内部跳转仍然使用 `Link`，包含如下 props

## to

- 目标路径，同 `Link` 中的 `to` 保持一致 ，必填
- 类型：`string`
- 默认值：`-`

## message

- 表示当前跳转需要弹窗确认，message为提示文案内容，选填
- 类型：`string`
- 默认值：`-`

代码示例：

```js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppLink } from '@ice/stark';

export default class SelfLink extends React.Component {
  // 商家平台代码
  render() {
    return (
      <div>
        <AppLink to="/waiter/list">使用 AppLink 跳转到小二平台的列表页</AppLink>
        <Link to="/detail">跳转到商家平台详情页</Link>
      </div>
    );
  }
}
```
