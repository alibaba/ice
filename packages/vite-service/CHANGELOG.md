# CHANGELOG

## 1.1.5

- [fix] normalize path in case of win32 system
- [fix] default value of rollupOptions.context for top-level this

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