# Changelog

## 1.9.3

- [fix] 内网 init 项目未生成 abc.json
- [fix] 组件 build 未合并自定义 buildConfig
- [chore] 接入 ice-npm-utils

## 1.9.2

- [fix] 移除掉 babel-runtime 的 alias，防止项目依赖里有不同版本导致无法构建
- [chore] 不写死 webpack 的依赖版本，防止多份 webpack 导致构建报错

## 1.9.1

- [fix] 修复 @babel/runtime alias 路径错误问题

## 1.9.0

- [feat] 支持 init 项目
- [feat] 支持 dev/build 区块&业务组件
- [feat] 新增 buildConfig.disableVendor 配置
- [feat] dev/build 前检测是否已安装依赖
- [chore] 移除部分无用的依赖

## 1.8.13

- [feat] 内置对 moment 的多语言优化
- [feat] 支持 outputAssetsPath 配置
- [fix] 修复 externals 的逻辑

## 1.8.12

- [fix] 修复 proxy target 语法错误

## 1.8.11

- [fix] console.log 拼错

## 1.8.10

- [feat] 通过 `buildConfig.uniteBaseComponent` 将不同的基础包做统一
- [fix] 依赖 typescript，解决云构建时找不到依赖的问题
- [feat] 新增依赖检测功能：多版本、多基础组件、错误版本的业务组件等
- [fix] 修复主题包 icons.scss 未构建问题
- [fix] Proxy 支持更多配置
- [feat] 支持 buildConfig.babelExclude
- [feat] 支持 buildConfig.babelPluginImportConfig

## 1.8.9

- [fix] 依赖 axios

## 1.8.8

- [feat] 支持构建 ts 语法
- [chore] 增加埋点

## 1.8.8

- [feat] 支持 TypeScript 构建

## 1.8.7

- [fix] ice-scripts 不固定ICE官方维护的包版本（ice-skin-loader&webpack-plugin-import）

## 1.8.6

- [fix] 修复 iceworks node 项目路径获取错误的问题

## 1.8.5

- [chore] 升级 ice-skin-loader 到 0.2.1

## 1.8.4

- [feat] 通过对命令行参数 --project-type 添加参数，增加对 iceworks 中生成的 node 项目的支持。

## 1.8.3

- [fix] 修复默认开启 UglifyJsPlugin sourceMap 引起的内存溢出问题，更新为默认关闭 sourceMap

## 1.8.2

- [chore] 降级 webpack-plugin-import 到 0.2.1 解决部分组件样式引入失败的问题

## 1.8.1

- [feat] 支持 css-module，仅对 `.module.[css/less/scss]` 文件后缀生效
- [feat] 命令行参数支持 --sourcemap
- [chore] 升级 webpack-plugin-import 到 0.2.2

## 1.8.0

- [fix] 没有配置 theme 也需要走 ice-skin-loader 的逻辑
- [chore] 升级 ice-skin-loader 到 0.2.x
- [chore] 移除 css-prefix-plugin

## 1.7.9

- [feat] build 支持 `customWebpackConfig` 参数
- [chore] 移除 ice-scripts 命令

## 1.7.8

- [chore] dev 模式下第一次编译成功后自动用本地浏览器打开对应地址

## 1.7.7

- [Fix] 修复 mini-css-extract-plugin 升级到 0.4.2 后报大量 warning ([issue #1057](https://github.com/alibaba/ice/issues/1057))
- [Fix] 修复设置 localization 时的路径引用问题 ([pull #1073](https://github.com/alibaba/ice/pull/1073))
