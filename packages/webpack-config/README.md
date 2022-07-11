# @ice/webpack-config

This package providers basic webpack configuration.

## Usage

```js
import { getWebpackConfig } from '@ice/webpack-config';
import webpack from 'webpack';

const config = { alias: {} };
const rootDir = process.cwd();
const runtimeTmpDir = '.ice';   // the path of the asset-manifest.json

const webpackConfig = getWebpackConfig({ rootDir, config, webpack, runtimeTmpDir });
```
