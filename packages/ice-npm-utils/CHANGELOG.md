# Changelog

## 1.3.1

- [feat] isAliNpm add `@kaola`

## 1.3.0

- [feat] getNpmRegistry remove npmconf and default `https://registry.npm.taobao.org`

## 1.2.0

- [feat] getNpmRegistry 优先读取 npm config，否则返回 `https://registry.npm.com`
- [fix] extract tarball consider directory

## 1.1.2

- [fix] 修复getAndExtractTarball写空文件时卡死的问题

## 1.1.1

- [fix] 用 request-promise 替换 axios 之后的参数变化

## 1.1.0

- [feat] 新增 getAndExtractTarball&getNpmTarball 两个 API
- [chore] 请求库从 axios 统一为 request

## 1.0.3

- [chore] 增加 log
- [fix] checkInternal timeout 延长到 3s

## 1.0.2

- init
