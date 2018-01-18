分析基础组件的依赖, 支持 @alife/next 和 @ali/ice 

使用方法:

1. CMD:

```bash
cd ice-form
dep-analyze ./src/index
```

2. Module:

```js
const depAnalyzer = require('ice-dep-analyze');
const result = depAnalyzer('/abs/path/to/entry/file');
```
