# ice-scripts Changelog

## 1.8.0

- [fix] 没有配置 theme 也需要走 ice-skin-loader 的逻辑
- [chore] 升级 ice-skin-loader 到 0.2.x
- [chore] 移除 css-prefix-plugin

## 1.7.9

- [feat] build 支持 `customWebpackConfig` 参数
- [chore] 移除 ice-scripts 命令

## 1.7.8

- [chore] dev模式下第一次编译成功后自动用本地浏览器打开对应地址

## 1.7.7

- [Fix] 修复 mini-css-extract-plugin 升级到 0.4.2 后报大量 warning ([issue #1057](https://github.com/alibaba/ice/issues/1057))
- [Fix] 修复设置 localization 时的路径引用问题 ([pull #1073](https://github.com/alibaba/ice/pull/1073))
