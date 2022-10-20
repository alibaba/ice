# Changelog

## 2.5.5

- [fix] check router status by userConfig.

## 2.5.4

- [fix] compatible with router `false`.

## 2.5.3

- [fix] revert from version 2.5.2 and suport memory router

## 2.5.2

- [fix] support custom history configuration.

## 2.5.1

- [fix] output of assets should be prefixed `index` instead of `app`, which break changed by version 2.5.0.

## 2.5.0

- [feat] use `vite-plugin-index-html` as a substitute in Vite mode.

## 2.4.2

- [fix] provide initial `pathname` with `location`. ([#4885](https://github.com/alibaba/ice/issues/4885))
- [fix] more elegant way to use `registerAppEnter` & `registerAppLeave`.

## 2.4.1

- [chore] solve typescript errors when enabling `tsChecker: true`. ([#4800](https://github.com/alibaba/ice/issues/4800))
- [fix] avoid RootApp re-rendering when route changes. ([#427](https://github.com/ice-lab/icestark/issues/427))
- [chore] provide more prompt information.

## 2.4.0

- [feat] an extra `type` option is configured to distinguish between framework and child. Util now, `type` in `appconfig.icestark` is deprecated.
- [feat] append icestark lifecycles automatically using babel parser.

## 2.3.0

- [feat] migrate runtime api
- [feat] upgrade build-scripts
- [feat] support es module out of box

## 2.2.1

- [fix] move all identifiers to visitor to avoid wrong execution results.

# 2.2.0

- [feat] support setting custom lifecycles. ([#337](https://github.com/ice-lab/icestark/issues/337))
- [fix] append lifecycles for other framework.

# 2.1.0

- [fix] get rendering container through `props` instead of `getMountNode`. ([#227](https://github.com/ice-lab/icestark/issues/227))
- [feat] support `omitSetLibraryName` for removing default setLibraryName.

# 2.0.9

- [fix] compatible with the case which icejs version is locked

# 2.0.8

- [fix] make `router.basename` work in a non-icestark context. ([#4234](https://github.com/alibaba/ice/issues/4234))
- [fix] use wrapperRouterRender when render child app

## 2.0.7

- [chore] publish source code of runtime.
- [feat] turn lifecycle function of icestark into `async`. ([#4190](https://github.com/alibaba/ice/pull/4190))
- [fix] set IAppRouter alias with AppRouterProps. ([#4192](https://github.com/alibaba/ice/pull/4192))
- [fix] fix wrong ast parser of `@ice/stark-app` & `react-dom`. ([#4193](https://github.com/alibaba/ice/pull/4193))

## 2.0.6

- [feat] add setLibraryName for umd. ([#240](https://github.com/ice-lab/icestark/issues/240))

## 2.0.5

- [feat] inject bootstrap lifecyle