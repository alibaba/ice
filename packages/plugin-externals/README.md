# @ice/plugin-externals

`@ice/plugin-externals` is a ice.js plugin. It provides a simple way to add externals support to your application.

## Install

```bash
$ npm i @ice/plugin-externals --save-dev
```

## Usage

Set preset `react` to external react in a easy way.

```js
import { defineConfig } from '@ice/app';
import externals from '@ice/plugin-externals';

export default defineConfig(() => ({
  plugins: [externals({ preset: 'react' })]
}));
```

Framework will auto add externals of `react` and `react-dom` to your application, and the cdn url will be inject to the document by default.

Also, you can custom externals and cdn url by yourself:

```js
import { defineConfig } from '@ice/app';
import externals from '@ice/plugin-externals';

export default defineConfig(() => ({
  plugins: [externals({
    externals: {
      antd: 'Antd',
    },
    cdnMap: {
      antd: {
        development: 'https://unpkg.com/antd/dist/antd.js',
        production: 'https://unpkg.com/antd/dist/antd.min.js',
      }
    }
  })]
}));
```
