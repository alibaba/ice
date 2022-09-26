# CHANGELOG

## 2.1.5

- [fix] do not remove origin css when config `cssChunkNames`.

## 2.1.4

- [fix] avoid top-level warning of esbuild.

## 2.1.3

- [feat] be able to resolve `.mts`

## 2.1.2

- [chore] optimize compile log

## 2.1.1

- [feat] plugin for rename main css chunk name
- [fix] arguments of plugin-history may be `undefined` in case of `plugin-router` being deactivated
- [fix] use `--disable-mock` command to escape MockPlugin

## 2.1.0

- [feat] refactor html plugin for SSR render when development
- [fix] lifecycle arguments for `after.build.compile`
- [fix] pass vite config for lifecycle hooks
- [fix] fail to open browser in mpa

## 2.0.3

- [fix] open both `about:blank` page and `localhost:3333` page
- [fix] `after.start.devServer` callback function has been called before the devServer is ready

## 2.0.2

- [feat] pass `context.rootDir` to `viteConfig.root`
- [fix] add proxy listeners if exists

## 2.0.1

- [fix] redirect import with alias
- [fix] build error in win32 system

## 2.0.0

- [fix] normalize path in case of win32 system
- [fix] default value of rollupOptions.context for top-level this
- [fix] bump version of `webpack-dev-server`(^2.0.0)

## 1.1.4

- [fix] resolve path with browser field when alias with absolute path

## 1.1.3

- [feat] support decorators-legacy as default parser

## 1.1.2

- [feat] add lifecycle of `after.start.devServer`
- [fix] alias path allow with node_modules
- [fix] error filter for `postcssOptions` 
- [fix] support transform proxy.pathRewrite
- [fix] redirect import from ice

## 1.1.1

- [fix] sourcemap does not work with mode vite
- [fix] transform config `postcssOptions` for vite

## 1.1.0

- [feat] built-in alias for ～antd and ～@alifd/next which commonly unused in style files

## 1.0.2

- [fix] print urls after server created

## 1.0.1

- [fix] transform additionalData for pre-processor