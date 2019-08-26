---
title: 关于 icestore
order: 1
---

## 背景

状态管理通常是一个应用最复杂的部分，React 原生提供了 setState, Context 等方式来实现本地与全局状态管理，对于更复杂的业务场景，原生方案也不能完全满足需求，因此社区中产生了大量状态管理方案来解决这个问题，比较有名的诸如 Redux, Mobx，但是这些方案引入了很多概念，有不小的学习成本，因此飞冰团队从易用性出发，基于 React Hooks 设计了一款面向 React 的轻量级状态管理方案 icestore，下面简单介绍一下 icestore 的核心优势。

## 简介

[icestore](https://github.com/ice-lab/icestore) 是基于 React Hooks 实现的轻量级状态管理框架，有以下核心特点：

* **极简 API**：只有 5 个 API，简单上手，使用方便，不需要学习 Redux 里的各种概念。
* **React Hooks**：拥抱 Hooks 的使用体验，支持在函数式组件中使用。
* **集成异步状态**：记录异步 action 的执行状态，简化 view 组件中对于 loading 与 error 状态的渲染逻辑。
* **性能优化**：通过多 store 的去中心化设计，减少单个 state 变化触发重新渲染的组件个数，从而减少不必要的渲染。
* **单向数据流**：与 Redux 一样使用单向数据流，便于状态的追踪与预测。

icestore 数据流示意图如下：  

<img src="https://user-images.githubusercontent.com/5419233/60956252-012f9300-a335-11e9-8667-75490ceb62b1.png" width="400" />

> 如果你的项目 React 版本不支持 Hooks（低于 16.8.0），推荐使用社区成熟的方案 [Redux](https://cn.redux.js.org/) 或者 [Mobx](https://cn.mobx.js.org/)

