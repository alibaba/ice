---
title: build.json
order: 1
---

build-scripts 将 `build.json` 作为默认的工程配置文件，将工程构建相关的配置都收敛在其中。文件需要存放在项目根目录（和 `package.json` 同级），如果不存在这个文件项目将使用默认配置。

## 配置内容

```json
{
  "entry": "src/index.js",
  "plugins": [
    "build-plugin-ice-app",
    ["build-plugin-fusion", {
      "themePackage": "@icedesign/theme"
    }]
    "./build.plugin.js"
  ]
}
```

build.json 中核心包括两部分内容：

* 基础配置
* 插件配置

## 基础配置

基础配置涵盖了常用 webpack 配置的定制场景，方便开发者快速设置项目工程配置。
这部分通常由基础插件提供，比如 `build-plugin-ice-app` 提供了 React 项目开发链路丰富的配置能力。

## 插件配置

通过 `build.json` 中提供的 `plugins` 字段可配置插件列表，已支持的插件请参考「插件列表」章节。

* 类型为： Array
* 默认值： []

插件数组项每一项代表一个插件，build-scripts 将按顺序执行插件列表，插件配置形式如下：

```json
{
  "plugins": [
    "build-plugin-ice-app"
  ]
}
```

如果插件包含自定义配置参数，则可以通过数组的形式配置：

```json
{
  "plugins": [
    ["build-plugin-fusion", {
      "themePackage": "@icedesign/theme"
    }]
  ]
}
```

上述数组形式的插件配置，其第一项为插件名，第二项为插件参数

### 本地插件

如果基础配置和插件都无法支持业务需求，可以通过自定义配置来实现，自定义配置同时也是通过插件能力来实现。首先新建 `build.plugin.js` 文件作为一个自定义插件，然后写入以下代码：

```js
module.exports = ({ context, onGetWebpackConfig }) => {
  // 修改 webpack 配置，比如修改默认 entry
  onGetWebpackConfig((config) => {
    config.entry('src/index.tsx');
  });
}
```

更完整的使用请参考「插件开发」文档。

最后在 `build.json` 里引入自定义插件即可：

```json
{
  "plugins": [
    "build-plugin-ice-app",
    "./build.plugin.js"
  ]
}
```