---
title: 快速开始
order: 1
---

ice.js 支持小程序开发。由于小程序端大部分能力及配置均与 Web 应用对齐，本章节仅介绍小程序快速开始、与 Web 应用的差异点以及小程序独有能力的使用。

:::tip
当你准备开发小程序时，请务必阅读本模块文档。
:::

## 创建小程序应用

共有两种方式创建 ice.js 小程序应用：

### 1. 通过小程序模板创建

```bash
$ npm create ice ice-app --template @ice/miniapp-scaffold
$ cd ice-app
$ npm install
```

创建完毕后可以直接跳到调试与构建章节。

### 2. 改造已有的 Web 应用

将已有的 ice.js Web 应用改造为支持小程序开发，只需进行以下几步：

#### 配置命令

在 `package.json` 中配置以下 scripts 命令：

```json
  "scripts": {
    "start": "ice start",
    "start:wechat": "ice start --target wechat-miniprogram",
    "start:ali": "ice start --target ali-miniapp",
    "build": "ice build",
    "build:wechat": "ice build --target wechat-miniprogram",
    "build:ali": "ice start --target ali-miniapp"
  }
```

#### 配置小程序开发插件及运行时依赖

安装小程序开发插件 `@ice/plugin-miniapp` 和小程序运行时依赖 `@ice/miniapp-runtime`：

```shell
$ npm install @ice/plugin-miniapp -D
$ npm install @ice/miniapp-runtime -S
```

在 `ice.config.mts` 中配置插件：

```js title=ice.config.mts
import miniapp from '@ice/plugin-miniapp';

export default defineConfig({
  plugins: [miniapp()],
});
```

#### 添加 `miniappManifest`

在 `src/app.tsx` 中导出 `miniappManifest`，在其中配置 `routes` 数组用以指定小程序中的页面（详见[小程序-路由](./router)）:

```js
export const miniappManifest = {
  routes: [
    // 初始化项目中仅有 index 一个页面
    'index' 
  ]
};
```

#### 适配 HTML 标签样式

从 Web 应用迁移而来意味着你的项目中使用了 HTML 标签，为了适配样式，你还需要在 `src/global.css` 引入样式的 polyfill：

```css
@import '@ice/miniapp-html-styles/html';
```

关于在小程序中使用 HTML 标签的注意事项，详见文档[使用 HTML 标签](./use-html)。

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

- [x] 配置小程序原生应用生命周期及事件
- [x] 配置小程序原生页面生命周期及事件
- [x] 配置原生小程序 project.config.json
- [x] 与原生页面、组件
- [x] 分包加载
- [ ] 独立分包
- [ ] 插件开发

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

