---
title: 框架 API
order: 10
---

## 基础

### runApp

用于创建和启动小程序应用。

## 生命周期

### usePageShow

在当前页面显示时触发。

### usePageHide

在当前页面被隐藏时触发。

### withPageLifeCycle

用于 class 组件可以通过 withPageLifeCycle 高阶方法监听页面的生命周期。

## 路由

### withRouter

用于 Class 组件可以通过 获取到路由的 withRouter 高阶方法获取到 history、location、match 对象。

### getHistory

用于获取 history 实例。

### useSearchParams

用于在非路由函数组件中解析 url 参数。

### withSearchParams

与 `useSearchParams` 对应，用在 Class Component 中。

## 事件

### registerNativeEventListeners

注册该页面需要监听的所有事件，第一个参数为页面级组件。

### addNativeEventListener

开始监听某个事件并执行回调函数。

### removeNativeEventListener

移除某个事件的回调函数。
