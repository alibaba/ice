---
title: 在 HTML 托管服务中集成
order: 3
---

本文讲解如何在 HTML 托管服务中集成前端资源，我们以 surge 框架为例。

## 全局安装 surge

```bash
npm install --global surge
```

## 运行 surge

以 `ice-demo` 项目名，ice 项目默认构建目录 `build` 为例
```bash
cd ice-demo/build
surge
```
> 依次确认账户， `project path`， `domain` 等信息，等待上传生效即可，详见 [surge](https://surge.sh/) 官方说明

## 注意事项

- 此类部署通常针对纯静态页面，如有 ajax 请求，可通过 jsonp ，或者 CORS 方式处理跨域问题