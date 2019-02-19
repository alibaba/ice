# ice-scripts Changelog

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
