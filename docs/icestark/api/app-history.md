---
title: appHistory
order: 11
---

提供手动切换不同应用的方法。

## appHistory.push

- 类型：`function`
- 代码示例：

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

- 类型：`function`
- 代码示例参考 `appHistory.push`
