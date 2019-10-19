---
title: 快速上手
order: 2
---

## 安装 CLI 工具

```bash
$ npm i -g iceworks
```

## 初始化框架应用

```bash
$ mkdir icestark-layout && cd icestark-layout
$ iceworks init project @icedesign/stark-layout-scaffold
# 安装依赖
$ npm install
# 启动服务
$ npm run start
```

即可通过浏览器预览整个应用：

![demo](https://img.alicdn.com/tfs/TB1aJ0WjAL0gK0jSZFtXXXQCXXa-2880-1578.png)

默认情况下，这个框架应用注册了三个子应用，具体可参考 `src/App.jsx` 的代码：

```jsx
<AppRouter>
  <AppRoute
    path={['/', '/message', '/about']}
    basename="/"
    exact
    title="通用页面"
    url={[
      '//unpkg.com/icestark-child-common/build/js/index.js',
      '//unpkg.com/icestark-child-common/build/css/index.css',
    ]}
  />
  <AppRoute
    path="/seller"
    basename="/seller"
    title="商家平台"
    url={[
      '//unpkg.com/icestark-child-seller/build/js/index.js',
      '//unpkg.com/icestark-child-seller/build/css/index.css',
    ]}
  />
  <AppRoute
    basename="/waiter"
    path="/waiter"
    title="小二平台"
    url={[
      '//unpkg.com/icestark-child-waiter/dist/js/app.js',
      '//unpkg.com/icestark-child-waiter/dist/css/app.css',
    ]}
  />
</AppRouter>
```

这三个子应用分别通过 React@15、React@16、Vue@2.x 开发实现，示例子应用的代码可以参考 [icestark-child-apps](https://github.com/ice-lab/icestark-child-apps)。

## 初始化子应用

```bash
$ mkdir icestark-child && cd icestark-child
# 基于 React 的子应用
$ iceworks init project @icedesign/stark-child-scaffold
# 安装依赖
$ npm install
# 启动服务
$ npm run start
```

接着将框架应用里 `src/App.jsx` 注册子应用的部分替换成当前子应用的信息即可。

完整使用请参考「指南」部分文档。
