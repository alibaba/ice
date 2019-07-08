# Changelog

## 2.3.3

- [refactor] 移除 zlib 依赖，使用 node 内置 zlib

## 2.3.2

- [feat] init component support fusion component adaptor

## 2.3.1

- [fix] 删除物料 publish 默认源配置，由用户自定义 #1866
- [fix] 修复 angular 物料模版生产环境构建结果未压缩的问题
- [refactor] 升级依赖 tar@4.x
- [feat] vue 物料模版支持 routeConfig 及 menuConfig

## 2.3.0

- [refactor] 移除原先构建开发业务组件&区块的功能及代码（break change）
- [fix] 修复 generate 失败未退出问题
- [fix] 修复上传文件不存在时状态码不规范问题
- [feat] 支持 angular 模板
- [refactor] 模版语法从 handlebars 改为 ejs（break change）

## 2.2.6

- [fix] 修复 token 不存在时的 bug

## 2.2.5

- [feat] 移除 materialConfig.type 的兼容逻辑，统一生成 `materials.json`
- [fix] getNpmTime 出错直接终止命令
- [fix] sync 命令异常处理不恰当，无法获取错误堆栈以及退出状态码不符合标准

## 2.2.4

- [fix] 撤销 materialConfig 的更改

## 2.2.3

- [refactor] 重构 generate 代码：合并重复代码，移除无用代码
- [feat] 批量查 npm 接口控制并发个数
- [feat] 物料配置优先读取 materialConfig，再读取 typeConfig
- [feat] 增加 logger.verbose 和 logger.info 两个方法

## 2.2.2

- [fix] 修复 generate 时 npm 不存在的 bug

## 2.2.1

- [chore] 接入 ice-npm-utils，代替原先的 npm 相关方法

## 2.2.0

 - [feat] 支持 vue 物料源
 - [feat] 支持 自定义物料模板
 - [refactor] 分离 block/component dev 和 build 逻辑
 - [revert] babel-plugin-transform-runtime

## 2.1.20

 - [feat] 引入 babel-plugin-transform-runtime
 - [feat] 支持编译 ts
 - [fix] markdown 中 code 解析时的默认 lang
 - [fix] README 中代码片段被 slice 的问题

## 2.1.19

 - [feat] 支持 antd 组件样式加载
 - [feat] dev 支持 ip 访问

## 2.1.18

 - [fix] homepage url 随 npm 版本更新

## 2.1.17

 - [feat] 增加组件 homepage 字段

## 2.1.16

 - [feat] 增加 markdown 中代码片段支持类型

## 2.1.15

 - [feat] 增加组件 demo 构建逻辑

## 2.1.14

 - [feat] 增加埋点
 - [feat] 更新提醒
 - [feat] 添加组件入库托管

## 2.1.13

- [fix] 区块 external React 后预览错误

## 2.1.12

- [fix] 修改 npm registry 为官方默认值

## 2.1.10

- [chore] 组件和区块开发不 external React

## 2.1.9

- [feat] 添加内部站点物料同步

## 2.1.8

- [fix] 修复 imagemin-pngquant 安装报错 [#46](https://github.com/imagemin/imagemin-pngquant/issues/46)


## 2.1.7

- [chore] typescript-definition-generator 迁移为 @alifd/dts-generator [#1475](https://github.com/alibaba/ice/pull/1475)

## 2.1.6

- [fix] 修复 block build 报错 [#1444](https://github.com/alibaba/ice/issues/1444)

## 2.1.5

- [fix] 增加默认 screenshot

## 2.1.4

- [feat] 兼容 ice 仓库的目录结构

## 2.1.3

- [feat] 支持 CSS Modules

## 2.1.2

- [bugfix] 修复物料生成错误

## 2.1.1

- [feat] 物料接入组件开发流程
- [feat] 支持独立的组件开发流程

## 2.0.8

- [bugfix] 修复依赖缺失问题

## 2.0.6

- [bugfix] 修复 generate 时报 babel-core 找不到的问题
- [bugfix] 添加 file-loader, 解决大图片的加载失败问题
- [bugfix] 修复 scaffold html 模板拉取失败问题

## 2.0.5

- [feat] 增加常用的 babel stage plugin

## 2.0.4

- [fix] 修复依赖缺失问题

## 2.0.3

- [refactor] 升级 babel 到 7.x

## 2.0.2

- [feat] block 预览支持皮肤配置

## 2.0.1

- [feat] 支持同步物料源数据到 fusion 和 unpkg
- [feat] 支持自动截图能力
- [feat] 支持 scope 选择
