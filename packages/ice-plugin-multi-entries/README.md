# ice-plugin-multi-entries

ice-scripts plugin for multiple entries

## Features

构建传统的多页应用，默认会将 `src/pages/*/index.js` 作为 entry，每个 page 都会作为一个 entry，以 pageName 构建多个同名 HTML 文件。

例如项目文件结构如下所示：

```
├── package.json
├── public
├── src
│   ├── api
│   ├── components
│   ├── pages
│   │   ├── BasicCharts
│   │   │   ├── index.scss
│   │   │   ├── components
│   │   │   └── index.js
│   │   ├── Home
│   │   │   ├── index.scss
│   │   │   ├── components
│   │   │   └── index.js
│   │   └── About
│   │       ├── index.scss
│   │       ├── components
│   │       └── index.js
```

则默认生成的 entry 为：

```javascript
{
  about: 'src/pages/About/index.js',
  basiccharts: 'src/pages/BasicCharts/index.js',
  home: 'src/pages/Home/index.js',
}
```

entry name 将作为 html 的文件名，访问路径为：

- localhost:4444/about.html
- localhost:4444/basiccharts.html
- localhost:4444/home.html

**注意:**

多 entry 的情况构建时会额外生成 vendor.js/css，需要自行在 html 里引入（public 目录会自动引入），也可以通过配置 `ice.config.js` 中的 `vendor: false` 禁止生成 vendor 文件。

## Options

- `getEntryName{function}`: 自定义 entry name，默认取小写的 `src/pages/*/index.js` 文件夹名称。

## Usage

Install npm:

```bash
$ npm i --save-dev ice-plugin-multi-entries
```

Add config to `ice.config.js`:

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-multi-entries', {
      // customize entry name
      // BasicCharts => basic_charts
      getEntryName: (pageName) => _.snakeCase(pageName);
    }]
  ]
}
```
