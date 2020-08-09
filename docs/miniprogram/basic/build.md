---
title: 小程序构建
order: 7
---

通过运行 `npm run build` 命令可以快速构建小程序应用。

```bash
$ cd <projectName>
$ npm run build
```

## 多端构建

通过配置 `targets` 可以构建出不同平台的代码，例如：

* `miniapp`：阿里小程序
* `wechat-miniprogram`：支付宝小程序

```json
{
  "targets": ["miniapp", "wechat-miniprogram"]
}
```

构建产物置于 `build/` 目录下。

```ts
build
├── miniapp
└── wechat-miniprogram
```

## 小程序 IDE

构建完成后我们可以将构建产物导入到 [支付宝小程序开发者工具](https://opendocs.alipay.com/mini/ide/download) 或者 [微信小程序开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) 进行预览。

![](https://img.alicdn.com/tfs/TB1NMf9QoY1gK0jSZFMXXaWcVXa-2880-1754.png)

