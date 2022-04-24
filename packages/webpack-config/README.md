# @ice/webpack-config

This package providers basic webpack configuration.


## Usage

```js
import { getWebpackConfig } from '@ice/webpack-config';
const config = { alias: {} };
const rootDir = process.cwd();
const webpackConfig = getWebpackConfig({ rootDir, config });
```
