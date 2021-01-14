## resolve-sass-import
resolve sass import statement, get sass import content in a single file

## Install

```bash
npm install resolve-sass-import --save
```

## Usage

```js
const resolveSassImport = require('resolve-sass-import');
const sassContent = resolveSassImport('main.scss', path.resolve(process.cwd(), 'src'));
```

## Example

variables1.scss

```scss
@color-1: #fff;
```
variables2.scss

```scss
@color-2: #000;
```

main.scss

```scss
@import './variables1.scss';
@import './variables2.scss';
```

```js
const sassContent = resolveSassImport('main.scss', './'));

// sassContent will log:
// @color-1: #fff;
// @color-2: #000;
```
