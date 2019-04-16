# uglify-parallel
> 多进程压缩 js 文件, 减少压缩 js 的耗时

## Usage

```js
const uglify_parallel = require('uglify-parallel');

// 可以封装在 gulp 任务中，也可以直接使用
gulp.task('uglify-parallel', ['webpack'], function() {
  return new Promise(function(resolve, reject) {
    uglify_parallel(
      {
        pattern: '**/*.js',
        src: SOURCE,
        dest: DEST,
        sourceMap: true,
        // https://github.com/mishoo/UglifyJS2/issues/490
        params: [
          '--compress',
          'unused=false,warnings=false',
          '--beautify',
          'beautify=false,ascii-only=true',
          '--mangle',
          '--comments=/^\\**!|@preserve|@license/',
        ],
      },
      function(error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
});
```

参数文档: https://github.com/mishoo/UglifyJS2
