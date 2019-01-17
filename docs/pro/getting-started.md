---
title: 开始使用
order: 1
category: ICE Design Pro
---

基于海量高质量可复用区块，通过 GUI 工具快速搭建的一套中后台模板。

![](https://img.alicdn.com/tfs/TB1mHIID29TBuNjy0FcXXbeiFXa-1920-1080.png)

## 特性

- 专业的设计支持: ICE Design
- 成熟的基础组件: ICE Component
- 丰富的业务模块: ICE Block
- 完善的开发工具: Iceworks

## 技术点

- icedesign
- react
- redux
- redux-thunk
- react-router-dom v4
- axios
- webpack v4
- etc...

## 功能

按照 Dashboard 综合页和 Block 分类进行展示

```
- 登录/注册
- Dashboard
- 图表页
  - 图表列表
- 表格页
  - 基础表格
  - 展示型表格
  - 表格列表
- 列表页
  - 文章列表
  - 卡片列表
  - 图文列表
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
├── build       // 打包资源
├── mock        // 模拟数据
├── public      // 静态资源
├── src
│   ├── api                // 接口定义
│   ├── components         // 公共组件
│   ├── layouts            // 通用布局
│   ├── pages              // 页面
│   ├── store              // 全局 store
│   ├── utils              // 工具函数
│   ├── configureStore.js  // redux 入口配置
│   ├── reducers.js        // reducers 入口配置
│   ├── index.js           // 应用入口
│   ├── menuConfig         // 导航配置
│   ├── routerConfig       // 路由配置
│   └── router.jsx         // 路由配置
├── tests                  // 测试
├── .gitignore             // git 忽略目录配置
├── .editorconfig          // 代码风格配置
├── .eslintignore          // eslint 忽略目录配置
├── .eslintrc              // eslint 配置
├── package.json           // package.json
└── README.md              // 项目说明
```

## 使用

1.  (推荐) GUI 工具使用: 下载 Iceworks
    ![](https://img.alicdn.com/tfs/TB1v7FtEh9YBuNjy0FfXXXIsVXa-954-684.png)

2.  CLI 命令使用:

```
$ npm start      // 启动预览服务器
$ npm run build  // 构建
```
