---
title: 事件
order: 6
---


框架提供了相关 API 用于小程序原生事件的监听。

## API

### registerNativeEventListeners

注册该页面需要监听的所有事件，第一个参数为页面级组件。

```js
registerNativeEventListeners(Component, [...eventName])	
```

### addNativeEventListener

开始监听某个事件并执行回调函数。

```js
addNativeEventListener(eventName, callback)	
```

### removeNativeEventListener

移除某个事件的回调函数。

```js
removeNativeEventListener(eventName, callback)	
```

## 示例

```jsx
import React, { Component } from 'react';
import { registerNativeEventListeners, addNativeEventListener, removeNativeEventListener } from 'ice';

function handlePageReachBottom() {

}

class Index extends Component {
  componentDidMount () { 
    // 开始监听 onReachBottom 事件
    addNativeEventListener('onReachBottom', handlePageReachBottom);
  }

  componentWillUnmount () {
    // 移除onReachBottom 事件的监听器
    removeNativeEventListener('onReachBottom', handlePageReachBottom);
  }

  render () {
    return (
      <view>
        <text>1</text>
      </view>
    )
  }
}

// 注册所有需要监听的原生事件
registerNativeEventListeners(Index, ['onReachBottom']);

export default Index;
```
