---
title: 关于 icestark
order: 0
---

icestark 是飞冰（ICE）的工作台解决方案，面向大型中后台系统的前端架构方案。

## 特性

- 极其轻量的库
- 代码侵入性少
- 使用方式简单（React Component）
- SPA 级别用户体验
- TypeScript 支持

## 使用场景

- 传统 SPA 应用都是一个代码仓库，随着业务不断发展，逐渐成为巨石（Monolithic）应用，不利于维护，希望参照后端微服务的理念拆分[微前端](https://zhuanlan.zhihu.com/p/41879781)
- 旧应用、新应用需要整合，统一 Layout 以及菜单管理，尽量少的改造成本
- 新开发大型中后台系统，不同功能模块由不同团队独立开发，独立仓库，独立运维，独立部署
- 去掉嵌套的 iframe，保留 SPA 体验

## 安装

```bash
$ npm i icestark --save
```

## 快速开始

Layout 通过 Component 方式引入 Icestark，统一管理、注册子应用。

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Icestark from 'icestark';
import Layout from './components/Layout';
import NotFound from './components/NotFound';

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Icestark
          apps={apps}
          getBundleUrl={({ repo, version, localPort, localIp, env, type }) => {
            if (env === 'local') {
              return `//${localIp}:${localPort}/${type}/index.${type}`;
            }
            const cdnHost = env === 'production' ? 'production.com' : 'daily.com';
            return `//${cdnHost}/${repo}/${version}/${type}/index.${type}`;
          }}
          NotFoundComponent={NotFound}
        />
      </Layout>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

## 相关链接

- [icestark GitHub 仓库](https://github.com/ice-lab/icestark)
