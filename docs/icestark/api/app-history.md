---
title: appHistory
order: 11
---

提供手动切换不同应用的方法。

## appHistory.push

- 唯一入参，`to`，标识目标路径，同 `Link` 中的 `to` 保持一致 ，必填
- 类型：`string`
- 默认值：`-`

代码示例：

```js
import React from 'react';
import { appHistory } from '@ice/stark';

export default class SelfLink extends React.Component {
  render() {
    return (
      <span onClick={() => {
        appHistory.push('/home');
      }}>
        selfLink
      </span>
    );
  }
}
```

## appHistory.replace

- 标识目标路径，同 `Link` 中的 `to` 保持一致 ，必填
- 类型：`string`
- 默认值：`-`
