# @ice/miniapp-runtime

> Forked from [@tarojs/runtime](https://github.com/NervJS/taro/tree/next/packages/taro-runtime) with respect ❤️
> Licensed under the MIT License
> https://github.com/NervJS/taro/blob/next/LICENSE

ice.js miniapp runtime. Connect the framework (DSL) rendering mechanism to the miniapp rendering mechanism, and connect the miniapp routing and life cycle to the corresponding life cycle of the framework

## Core API

### createPageConfig()

Expose to `@ice/miniapp-loader/page` calls, called in the miniapp page file, to create a miniapp page specification object accepted by the miniapp `Page` constructor.

### window

An object that imitates the browser's `window` implementation on the miniapp side, and returns the browser's own `window` in the browser environment. This object is injected into the global object via Webpack's [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) for third-party libraries to call.

### navigator

An object that imitates the browser's `navigator` implementation on the miniapp side, and returns the browser's own `navigator` in the browser environment. This object is injected into the global object via Webpack's [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) for third-party libraries to call.

###document

An object that imitates the browser's `document` implementation on the miniapp side, and returns the browser's own `document` in the browser environment. This object is injected into the global object via Webpack's [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) for third-party libraries to call.

### Current

Global variables exposed to developers currently have three properties:

* `Current.app`, returns the current miniapp application instance, and the non-mini program side returns the miniapp specification application instance, which can be used to call the miniapp specification life cycle.
* `Current.page`, returns the current miniapp page instance, and the non-miniapp side returns the miniapp specification page instance, which can be used to call the miniapp specification life cycle.
* `Current.router`, returns the current miniapp routing information, and the non-miniapp side returns the miniapp specification routing information
