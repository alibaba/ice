---
title: 快速开始
order: 1
---

ice.js 支持小程序开发。由于小程序端大部分能力及配置均与 Web 应用对齐，本章节仅介绍小程序快速开始、与 Web 应用的差异点以及小程序独有能力的使用。

:::tip
当你准备开发小程序时，请务必阅读本模块文档。
:::

## 配置命令

参考[快速开始-创建应用](../start)并安装依赖后，在 `package.json` 中配置以下 scripts 命令：

```json
  "scripts": {
    "start": "ice start",
    "start:wechat": "ice start --platform wechat-miniprogram",
    "start:ali": "ice start --platform ali-miniapp",
    "build": "ice build",
    "build:wechat": "ice build --platform wechat-miniprogram",
    "build:ali": "ice start --platform ali-miniapp"
  }
```

## 配置小程序开发插件

在 `ice.config.mts` 中配置 `@ice/plugin-miniapp` 插件：

```js title=ice.config.mts
import miniapp from '@ice/plugin-miniapp';

export default defineConfig({
  plugins: [miniapp()],
});
```

## 调试与构建

当需要开发小程序时，执行对应的命令即可。例如，需要开发调试微信小程序时，执行

```shell
$ npm run start:wechat
```

需要构建微信小程序生产环境的产物时，执行

```shell
$ npm run build:wechat
```

编译完成后，命令行会给出相应提示，提醒开发者使用对应的小程序开发者工具打开编译产物目录进行调试预览：

```shell
Use wechat-miniprogram developer tools to open the following folder:
~/Code/ice-next/examples/miniapp-project/build
```

## 支持小程序平台

可以看到，相比开发 Web 应用，开发小程序的命令需要传递 `platform` 参数，目前 ice.js 支持开发的小程序平台及其 `platform` 名称如下：

| 小程序平台                     | platform           |
| ------------------------------ | ------------------ |
| 阿里系（支付宝、淘宝、钉钉等） | ali-miniapp        |
| 微信                           | wechat-miniprogram |

暂未支持但计划支持的小程序平台及其 `platform` 名称如下：

| 小程序平台 | platform             |
| ---------- | -------------------- |
| 字节       | bytedance-microapp   |
| 百度       | baidu-smartprogram   |
| 快手       | kuaishou-miniprogram |

## 待支持能力

- [ ] 配置小程序原生应用生命周期及事件
- [ ] 配置小程序原生页面生命周期及事件
- [ ] 配置原生小程序 project.config.json
- [ ] 与原生页面、组件、插件混用
- [ ] 分包加载

## 不支持能力

受小程序环境限制，以下 ice.js 提供的能力在小程序端不适用，相关章节中也会进行标注：

- [数据模拟 Mock](../basic/mock)

:::info
小程序中的数据请求需要统一使用其提供的 request 相关 API，因此 ice.js 提供的数据模拟 Mock 能力对小程序不适用。小程序端的数据模拟能力可通过开发者工具进行配置使用，这里列出阿里及微信小程序的相关使用文档：
- [阿里小程序 Anymock 场景数据平台扩展](https://opendocs.alipay.com/mini/anymock)
- [微信小程序 API Mock](https://developers.weixin.qq.com/miniprogram/dev/devtools/api-mock.html)
:::

- [构建时渲染 SSG](../basic/ssg)
- [服务端渲染 SSR](../basic/ssr)
- [定制 HTML](../basic/document)
- [权限管理](../advanced/auth)
- [CSS 资源本地化](../advanced/css-assets-local)
- [Keep Alive](../advanced/keep-alive)
- 使用 antd/fusion 等已有 Web 组件库

:::info
没有经过适配的 Web 组件库暂时无法直接在 ice.js 小程序端使用。
:::

