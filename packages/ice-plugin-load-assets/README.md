## ice-plugin-load-assets

Usage:

基本用法：

```js
// 配合 external 自动加载 react, react-dom 的资源
module.exports = {
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  plugins: [
    ['ice-plugin-load-assets', {
      assets: ['https://unpkg.com/react@16.7.0/umd/react.production.min.js', 'https://unpkg.com/react-dom@16.7.0/umd/react-dom.production.min.js'],
    }],
  ]
};
```

支持不同命令下的加载：

```js
module.exports = {
  plugins: [
    ['ice-plugin-load-assets', {
      assets: {
        dev: ['https://unpkg.com/react@16.7.0/umd/react.development.js', 'https://unpkg.com/react-dom@16.7.0/umd/react-dom.development.js'],
        build: ['https://unpkg.com/react@16.7.0/umd/react.production.min.js', 'https://unpkg.com/react-dom@16.7.0/umd/react-dom.production.min.js'],
      },
    }],
  ]
};
```