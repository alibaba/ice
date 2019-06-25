---
title: AppLink
order: 7
---

子应用互相跳转使用，替代 React Router 的 `Link` 组件，表示本次跳转可能需要重新加载静态资源，包含如下 props

## to

- 标识目标路径，同 `Link` 中的 `to` 保持一致 ，必填
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
  render() {
    return (
      <div>
        <AppLink to="/user/home">仓库间跳转使用 AppLink 跳转到 B 仓库的 UserHome 页面</AppLink>
        <Link to="/about">跳转到 A 仓库的 About 页面</Link>
      </div>
    );
  }
}
```
