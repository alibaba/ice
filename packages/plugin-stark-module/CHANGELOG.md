# Changelog

## 2.2.4

- [fix] when `url` configured, compile externals to `runtime.json`.
- [fix] add dev log.

## 2.2.3

- [fix] move `webpack-plugin-import` to dependencies.

## 2.2.2

- [fix] avoid undefined error when providing empty options.

## 2.2.1

- [fix] remove default value of root's config to avoid changing the default behavior.

## 2.2.0

- [feat] allow to register `outputDir` in root.

## 2.1.0

- [feat] update `build-script` to 1.x.

## 2.0.3

- [fix] register [`webpack-plugin-import`](https://github.com/ice-lab/ice-scripts/tree/master/packages/webpack-plugin-import) plugin. ([#300](https://github.com/ice-lab/icestark/issues/300))

# 2.0.2

- [fix] update `build-scripts-config` to solve lessOption compatible error. ([#4217](https://github.com/alibaba/ice/issues/4217))

## 2.0.1

- [fix] set `devServer.contentBase` the right way.

## 2.0.0

- [feat] support built-in babel plugin to append lifecycle.
- [feat] generate `runtime.json` when externals enabled.

