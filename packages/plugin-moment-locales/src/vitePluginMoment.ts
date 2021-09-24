// moment.js 中存在 require('./locale/' + name)，在 webpack 模式下会全量打包
// vite 模式自动注入 `import 'moment/dist/locale/zh-cn'` 语言包
