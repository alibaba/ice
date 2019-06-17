# ice-plugin-wrap-code

Usage:

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-wrap-code', {
      addCodeBefore: 'console.log("some code before entry")',
      addCodeAfter: 'console.log("some code after entry")',
    }
  ]
}
```

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-wrap-code', {
      addCodeBefore: () => {
        return 'console.log("some code before entry")';
      },
      fileMatch: (chunkName, compilerEntry, compilation) => {
        // 指定需要添加代码的目标文件
        if (chunkName.indexOf('target')) {
          return true;
        }
        return false;
      },
    }
  ]
}
```