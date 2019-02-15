<p align="center">
  <a href="https://alibaba.github.io/ice">
    <img alt="ICE" src="https://gw.alicdn.com/tfs/TB1FEW2nfDH8KJjy1XcXXcpdXXa-487-132.svg" width="200">
  </a>
</p>
<p align="center">赋能企业中后台建设</p>
<p align="center">
  <a href="https://github.com/alibaba/ice/blob/master/LICENSE"><img src="https://img.shields.io/badge/lisense-MIT-brightgreen.svg"></a>
</p>

## 简介

基于海量高质量可复用区块，通过 GUI 工具快速搭建的一套中后台模板。

![ice-design-pro](https://img.alicdn.com/tfs/TB1_bulmpOWBuNjy0FiXXXFxVXa-1920-1080.png)

## 特性

- 专业的设计支持: [ICE Design](https://alibaba.github.io/ice/design.html)
- 成熟的基础组件: [ICE Component](https://alibaba.github.io/ice/component/button)
- 丰富的业务模块: [ICE Block](https://alibaba.github.io/ice/block)
- 完善的开发工具: [iceworks](https://alibaba.github.io/ice/iceworks)

## 技术点

- icedesign
- react
- redux
- redux-thunk
- react-router-dom v4
- axios
- webpack v4
- mockjs
- etc...

## 页面

> 按照 Dashboard 综合页和 Block 分类进行展示

```
- Dashboard
- 图表页
  - 图表列表
- 表格页
  - 基础表格
  - 展示型表格
  - 表格列表
- 列表页
  - 文章列表
  - 项目列表
- 内容页
  - 基础详情页
  - 条款协议页
  - 进度展示页
- 结果页
  - 成功
  - 失败
- 异常
  - 403 无权限
  - 404 找不到
  - 500 服务器出错
  - 内容为空
```

## 目录结构

```
ice-design-pro
├── dist        // 打包资源
├── mock        // 模拟数据
├── public      // 静态资源
├── src
│   ├── components   // 公共组件
│   ├── layouts      // 通用布局
│   ├── locales      // i18n
│   ├── pages        // 页面
│   ├── index.js     // 应用入口
│   ├── menuConfig   // 导航配置
│   ├── routerConfig // 路由配置
│   └── router.jsx   // 路由配置
├── tests            // 测试
├── .gitignore       // git 忽略目录配置
├── .editorconfig    // 代码风格配置
├── .eslintignore    // eslint 忽略目录配置
├── .eslintrc        // eslint 配置
├── package.json     // package.json
└── README.md        // 项目说明
```

## 使用

1.  (推荐) GUI 工具使用: 下载 [iceworks](https://alibaba.github.io/ice/#/iceworks)

2.  Cli 命令使用:

```bash
$ npm start      // 启动预览服务器
$ npm run build  // 构建 dist
```

## 相关文档

- [ICE Design Pro 使用文档](https://github.com/alibaba/ice/wiki#ice-design-pro-%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3)
