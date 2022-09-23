# `@ice/miniapp-loader`

> Forked from [@tarojs/loader](https://github.com/NervJS/taro/tree/next/packages/taro-loader) with respect ❤️
> Licensed under the MIT License
> https://github.com/NervJS/taro/blob/next/LICENSE

暴露给 ice.js 使用的 Webpack loader，用于构建小程序产物，包含以下 `loader`:

## page

小程序专用。在小程序页面文件调用 `@ice/miniapp-runtime` 的 `createPageConfig` 方法创建一个小程序 `Page` 构造函数接受的对象。
