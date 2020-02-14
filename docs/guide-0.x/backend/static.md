---
title: 在 HTML 托管服务中集成
order: 3
---

本文讲解如何在 HTML 托管服务中集成前端资源，我们以 [surge](http://surge.sh/) 为例。

## 全局安装 surge

```bash
npm install --global surge
```

## 运行 surge

以 `ice-demo` 项目名，ice 项目默认构建目录 `build` 为例：

```bash
cd ice-demo/build
surge
```

> 依次确认账户， `project path`， `domain` 等信息，等待上传生效即可，详见 [surge](https://surge.sh/) 官方说明

## 其他同类产品

- [surge](http://surge.sh/)
- [github pages](https://pages.github.com/)
- [netlify](https://www.netlify.com/)
