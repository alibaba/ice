---
title: 使用 SmartLoader 调试线上页面
category: 进阶指南
order: 11
---

传统模式下，前后端接口联调的模式是：

1. 约定数据格式, 前端使用如 DIP 之类的工具 MOCK 接口, 然后前端页面使用 MOCK 接口进行本地开发
2. 上线/联调时将 Mock 接口换成真实的后端接口

理想是美好的, 但是现实往往是骨感的，从第一步到第二步经常会伴随着很多实际问题, 比如：

1. Mock 接口需要成本，很多项目更希望在本地直接使用后端接口，此时往往会出现跨域问题
2. 接口格式变更，前端需要改 Mock 数据本地验证然后发布日常再进行验证，流程很复杂

针对这个问题，ICE 给出的方案是 SmartLoader，即直接在日常/线上加载本地的前端资源，事实上之前我们也推荐过类似的模式，需要后端同学在 vm 中加一段简单判断的逻辑：

> 如果用户访问的 URL 中带有参数 debug, 就加载本地的静态资源, 否则加载线上的资源

但是实践下来发现，这个方式或多或少会带来一些成本，因此很多项目并未采用，还是在使用传统的模式。当然如上所述，传统模式依然有各种各样的问题，经过我们的讨论，最后总结出 SmartLoader 的方案：不需要后端修改 vm 就可以达到满足条件时加载本地静态资源的效果，只要启动本地 dev 服务，然后在访问页面时加上对应参数，页面就会加载本地的静态，同时一旦本地代码有修改, 直接刷新页面就可以看到最新的效果, 不再需要走发布和修改 vm, 快速定位和修复问题。

## 使用方法

1. 打开项目根目录下的 `abc.json` 文件, 在 `options` 字段下开启或新增 `"smartLoader": true`

```json
{
  "name": "...",
  "options": {
    "//": "...",
    "smartLoader": true
  }
}
```

2. 重新启动 dev 服务器即可，对于之前已经发布过的页面, 需要再次发布一次以确保线上的 JS 中包含此功能
3. 访问线上地址使用参数 `debug=true` 开启, 默认加载的本地 JS 路径为 `//127.0.0.1:3333/index.js`, 你可以通过 `debugPort=xxxx` 的方式修改端口, `debugPath=/build/index.js` 的方式修改 JS 文件路径, CSS 样式路径会自动根据 JS 地址替换.

   例子:  `https://we.taobao.com/mirror/mirror.html?dapeiId=990014&activityId=1188&debug=true&debugPort=4444&debugPath=/build/index.js`

## HTTPS 支持

我的线上页面是 HTTPS 的, 不能加载本地 HTTP 地址怎么办?

ICE 默认启动的开发服务器是基于 HTTP 的, 我们特别提供了 HTTPS 服务器, 只需执行

```bash
def dev --https
```

就可以在本地以 HTTPS 的方式启动开发服务器.

## HTTPS 模式本地证书验证

如果使用了 `--https` 的方式，需要信任本地证书，我们提供了两种方式信任本地证书:

1. (推荐) 如果你使用的是 Chrome, 请打开 `chrome://flags/#allow-insecure-localhost` 并启用 `Allow invalid certificates for resources loaded from localhost` 这一个项, 重启 Chrome 生效. 这样 Chrome 对于访问本地 (localhost/127.0.0.1) 和本地签名的证书会自动放行.

2. 请按照终端上的提示, 打开证书文件对应目录, 手动在系统中信任证书：

  - OSX 用户:
    1. 双击打开 rootCA.crt
    2. 确认将证书添加到登陆(login) 或 系统(system)   <br/><img src="https://img.alicdn.com/tfs/TB18pPVSFXXXXc_aXXXXXXXXXXX-1074-604.png" width="500" />
    3. 搜索并找到 ICE Builder SSL 证书, 双击打开并手动配置为信任（Always Trust） <img src="https://img.alicdn.com/tfs/TB1BcIBSFXXXXXkXpXXXXXXXXXX-1754-1110.png" width="500" />
  - Windows 用户
    - 如图操作, 双击打开 rootCA.crt, 点击安装证书并选择到信任列表  <img src="https://img.alicdn.com/tfs/TB1cg6_SFXXXXbuXVXXXXXXXXXX-1790-1082.png" width="500">

> 技术支持: 请在 ICE 万能群反馈问题或联系 @卓凌