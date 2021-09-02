# Changelog


## 2.2.1

- [fix] hot update may escape `replaced` flag.

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