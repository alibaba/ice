## ice-plugin-wrap-externlas

Usage:

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-wrap-externals', {
      externals: {
        react: {
          global: 'window.React',
          urls: ['https://unpkg.com/react@16.7.0/umd/react.production.min.js'],
        },
        'react-dom': {
          global: 'window.ReactDOM',
          urls: ['https://unpkg.com/react-dom@16.7.0/umd/react-dom.production.min.js'],
        },
      },
    }],
  ]
};
```