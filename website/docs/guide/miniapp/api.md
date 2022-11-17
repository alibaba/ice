---
title: API
order: 6
---

## Uni API

为扩展 ice.js 体系能力边界，我们为开发者提供了一系列的 Universal API，开发者可以通过调用这些 API 快速开发多端应用。

Uni API 提供丰富完善的 API，支持 Web、微信小程序、阿里小程序、字节小程序等多种环境，开箱即用，快速接入，更支持按环境拆包，提供更极致的代码体积，体验升级。使用方式详见 [Uni API](https://universal-api.js.org/) 文档。

## 原生小程序 API
对于 Uni API 没有覆盖到的场景，你也可以直接在 ice.js 小程序中使用小程序原生 API（即微信小程序的 `wx` API 等）。此时如果仍有跨端诉求，你可以结合 @uni/env 进行处理，示例如下：

```js
import { isMiniApp, isWeChatMiniProgram } from '@uni/env';

function scan() {
  if (isWeChatMiniProgram) {
    wx.scanCode();
  } else if (isMiniApp) {
    my.scan();
  }
}
```

## 参考文档

- [阿里小程序前端 API](https://opendocs.alipay.com/mini/api/vzt2xm)

- [微信小程序端 API](https://developers.weixin.qq.com/miniprogram/dev/api/)
