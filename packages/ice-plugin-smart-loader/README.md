## ice-plugin-smart-loader

Feature：

自动加载本地js/css，当 URL 中包含 debug=true 时, 不加载对应当前js, 如加载 127.0.0.1:3333/index.js
其中支持地址参数
* 端口可定制：debugPort=8888
* 路径可定制：debugPath=/build/xxx/yyy/index.js，入口脚本将加载：127.0.0.1:3333/build/xxx/yyy/index.js
* 脚本目录地址：outputPath=dist，即对应加载脚本的位置将在 127.0.0.1:3333/dist/ 下

Usage:

```js

// ice.config.js
module.exports = {
  plugins: [
    'ice-plugin-smart-loader'
  ]
}
```
