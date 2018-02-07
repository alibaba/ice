# clean-css-parallel

使用 clean-css 多进程压缩 css 文件

## Usage

```js
gulp.task('clean-css-parallel', ['webpack'], function() {
  return new Promise(function(resolve) {
    cssnano_parallel(
      {
        pattern: '**/*.css',
        src: abcConfig.BUILD_BASE,
        dest: abcConfig.BUILD_BASE,
        params: [],
      },
      function() {
        resolve();
      }
    );
  });
});
```

参数文档: https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-cli
